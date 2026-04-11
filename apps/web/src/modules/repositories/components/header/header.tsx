import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRepositories } from "@/modules/repositories/contexts"

const BUTTONS_FILTERS = {
  all: "Todos",
  public: "Públicos",
  private: "Privados",
  forked: "Forked",
}

export function RepositoriesHeader() {
  const { filters, setFilters, search, setSearch, pagination, totalRepos } =
    useRepositories()

  return (
    <div className="col-span-4 flex flex-col justify-center gap-4 bg-card p-8">
      <div className="mt-auto flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div>
          <p className="text-xs font-light text-muted-foreground uppercase">
            REPOSITÓRIOS / {totalRepos} TOTAL
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

      <div className="mt-auto ml-auto flex items-center space-x-2">
        <Button
          variant="secondary"
          disabled={!pagination.hasPrev}
          onClick={pagination.prev}
        >
          <ChevronLeft />
        </Button>
        <p>Página: {pagination.page}</p>
        <Button
          variant="secondary"
          disabled={!pagination.hasNext}
          onClick={pagination.next}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
