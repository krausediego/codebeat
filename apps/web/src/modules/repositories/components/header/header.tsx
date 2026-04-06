import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronRight } from "lucide-react"

export function RepositoriesHeader() {
  return (
    <div className="col-span-4 flex flex-col justify-center bg-card p-8">
      <div className="mt-auto flex items-center justify-between">
        <div>
          <p className="text-xs font-light text-muted-foreground uppercase">
            REPOSITÓRIOS / 42 TOTAL
          </p>
          <h1 className="text-4xl leading-none font-medium text-card-foreground">
            Source Management
          </h1>
        </div>

        <div className="space-y-6">
          <InputGroup>
            <InputGroupAddon>
              <ChevronRight className="text-primary" />
            </InputGroupAddon>
            <InputGroupInput placeholder="BUSCAR_REPOSITÓRIOS..." />
          </InputGroup>
          <div className="flex gap-2">
            <Button variant="outline" className="uppercase">
              Todos
            </Button>
            <Button variant="outline" className="uppercase">
              Publicos
            </Button>
            <Button variant="outline" className="uppercase">
              Privados
            </Button>
            <Button variant="outline" className="uppercase">
              Forked
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-auto ml-auto space-x-2">
        <Button>Anterior</Button>
        <Button>Próxima</Button>
      </div>
    </div>
  )
}
