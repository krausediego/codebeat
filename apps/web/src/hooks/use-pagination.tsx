import * as React from "react"

interface PaginationProps<T> {
  data: T[]
  perPage: number
}

export function usePagination<T>({ data, perPage = 8 }: PaginationProps<T>) {
  const [page, setPage] = React.useState(1)

  const totalPages = Math.ceil(data.length / perPage)

  const paginated = React.useMemo(() => {
    return data.slice((page - 1) * perPage, page * perPage)
  }, [data, page, perPage])

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages))
  const next = () => goTo(page + 1)
  const prev = () => goTo(page - 1)

  return {
    paginated,
    page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    next,
    prev,
    goTo,
  }
}
