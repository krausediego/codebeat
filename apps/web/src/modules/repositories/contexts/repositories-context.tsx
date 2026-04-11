import {
  PaginationResponse,
  usePagination,
  usePerPage,
  useQueryRepos,
} from "@/hooks"
import * as React from "react"
import { ReposData } from "../types"

type Filters = "all" | "public" | "private" | "forked"

type RepositoriesProviderProps = {
  children: React.ReactNode
}

type RepositoriesProviderState<T> = {
  totalRepos: number
  filters: Filters
  setFilters: (filter: Filters) => void
  pagination: PaginationResponse<T>
  search: string
  setSearch: (search: string) => void
}

const RepositoriesProviderContext = React.createContext<
  RepositoriesProviderState<ReposData> | undefined
>(undefined)

export function RepositoriesProvider({ children }: RepositoriesProviderProps) {
  const [filters, setFiltersState] = React.useState<Filters>("all")
  const [search, setSearchState] = React.useState("")
  const { data: repos } = useQueryRepos()
  const perPage = usePerPage({ default: 6, "2xl": 9 })

  const filteredRepos = React.useMemo(() => {
    const data = repos?.data ?? []

    const byFilter = (() => {
      switch (filters) {
        case "public":
          return data.filter((r) => !r.private && !r.fork)
        case "private":
          return data.filter((r) => r.private)
        case "forked":
          return data.filter((r) => r.fork)
        default:
          return data
      }
    })()

    if (!search.trim()) return byFilter

    return byFilter.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [repos?.data, filters, search])

  const pagination = usePagination({ data: filteredRepos, perPage })

  const setFilters = (filter: Filters) => {
    setFiltersState(filter)
    pagination.goTo(1)
  }

  const setSearch = (value: string) => {
    setSearchState(value)
    pagination.goTo(1)
  }

  const value = {
    totalRepos: repos?.total as number,
    filters,
    setFilters,
    pagination,
    search,
    setSearch,
  }

  return (
    <RepositoriesProviderContext.Provider value={value}>
      {children}
    </RepositoriesProviderContext.Provider>
  )
}

export const useRepositories = () => {
  const context = React.useContext(RepositoriesProviderContext)

  if (context === undefined) {
    throw new Error(
      "useRepositories must be used within a RepositoriesProvider"
    )
  }

  return context
}
