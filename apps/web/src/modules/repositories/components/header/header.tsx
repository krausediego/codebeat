import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronRight } from "lucide-react"
import { useRepositories } from "@/modules/repositories/contexts"

const BUTTONS_FILTERS = {
  all: "Todos",
  public: "Públicos",
  private: "Privados",
  forked: "Forked",
}

export function RepositoriesHeader() {
  const { filters, setFilters, search, setSearch } = useRepositories()

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

        <div className="space-y-3">
          <InputGroup>
            <InputGroupAddon>
              <ChevronRight className="text-primary" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="BUSCAR_REPOSITÓRIOS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="uppercase"
            />
          </InputGroup>
          <div className="flex gap-2">
            {Object.entries(BUTTONS_FILTERS).map(([key, value]) => {
              return (
                <Button
                  variant={filters === key ? "default" : "outline"}
                  onClick={() =>
                    setFilters(key as keyof typeof BUTTONS_FILTERS)
                  }
                  className="uppercase"
                >
                  {value}
                </Button>
              )
            })}
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
