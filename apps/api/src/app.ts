import { globSync } from "node:fs";
import path from "node:path";
import openapi from "@elysiajs/openapi";
import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { envApp, ILoggingManager, makeLogging } from "@/infra";
import { loggerPlugin } from "@/routes/plugins";

export class App {
  private app: Elysia;

  constructor(private readonly logger: ILoggingManager) {
    this.app = new Elysia();
  }

  async setupPlugins(): Promise<this> {
    console.log(envApp.WEB_BASE_URL);
    this.app.use(
      openapi({
        documentation: {},
      })
    );
    this.app.use(
      cors({
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        origin: envApp.WEB_BASE_URL,
      })
    );
    this.app.use(loggerPlugin);
    return this;
  }

  async setupRoutes(): Promise<this> {
    const routesPathPattern = path.resolve(__dirname, "routes/v*");
    const versionFolders = globSync(routesPathPattern);

    for (const versionPath of versionFolders) {
      const version = path.basename(versionPath);

      const routeFiles = globSync(`${versionPath}/*.{js,ts}`, {
        exclude: ["**/*.map"],
      });

      for (const file of routeFiles) {
        const route = await import(file);
        if (route?.default) {
          const versionedPlugin = new Elysia({ prefix: `/api/${version}` }).use(
            route.default
          );

          this.app.use(versionedPlugin);
        }
      }
    }

    return this;
  }

  listen(port: number): this {
    this.app.listen(port, () => {
      this.logger.info(`🦊 Server running at http://localhost:${port}`);
    });

    return this;
  }

  getApp(): Elysia {
    return this.app;
  }
}

export default new App(makeLogging());
