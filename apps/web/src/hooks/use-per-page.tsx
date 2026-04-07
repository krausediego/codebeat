import { useEffect, useState } from "react"

export function usePerPage(options: {
  default: number
  lg?: number
  xl?: number
  "2xl"?: number
}) {
  const [perPage, setPerPage] = useState(options.default)

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (options["2xl"] && width >= 1536) {
        setPerPage(options["2xl"])
      } else if (options.xl && width >= 1280) {
        setPerPage(options.xl)
      } else if (options.lg && width >= 1024) {
        setPerPage(options.lg)
      } else {
        setPerPage(options.default)
      }
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [options.default, options.lg, options.xl])

  return perPage
}
