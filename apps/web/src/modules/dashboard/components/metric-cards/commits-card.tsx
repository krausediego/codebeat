import { cn } from "@/lib/utils"
import { useQueryCommits } from "../../hooks"
import { Separator } from "@/components/ui/separator"
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts"
import { useMemo } from "react"

export function CommitsCard() {
  const { data: commits } = useQueryCommits()

  const positiveCommitDelta =
    commits?.deltaCommits30d && commits?.deltaCommits30d > 0

  const CustomBar = (props: any) => {
    const { x, y, width, height } = props
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#1a2a3a" />
        <rect x={x} y={y} width={width} height={1} fill="#378ADD" />
      </g>
    )
  }

  const data = useMemo(() => {
    if (!commits?.heatmap) return
    const map = new Map<string, number>()

    for (const day of commits?.heatmap ?? []) {
      const dateStr =
        typeof day.date === "string"
          ? day.date
          : new Date(day.date).toISOString()

      const month = dateStr.slice(0, 7)
      map.set(month, (map.get(month) ?? 0) + day.count)
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12) // pega só os últimos 12 meses
      .map(([month, count]) => ({
        month: new Date(month + "-02").toLocaleDateString("pt-BR", {
          month: "short",
        }),
        commits: count,
      }))
  }, [commits?.heatmap])

  return (
    <div className="row-span-2 flex flex-col justify-between rounded-md bg-card p-8">
      <div className="space-y-4">
        <p className="text-xs font-light text-muted-foreground uppercase">
          commits / 30 dias
        </p>
        <h1 className="text-5xl leading-none font-medium text-card-foreground">
          {commits?.commits30d}

          <span
            className={cn(
              "text-xs uppercase",
              positiveCommitDelta ? "text-emerald-500" : "text-destructive"
            )}
          >
            {commits?.deltaCommits30d}% VS MÊS ANT.
          </span>
        </h1>
      </div>

      <div className="space-y-24">
        <div className="space-y-4">
          <Separator />
          <p className="text-xs font-light text-muted-foreground uppercase">
            TOTAL ÚLTIMO ANO
          </p>
          <h1 className="text-5xl leading-none font-medium text-card-foreground">
            {commits?.totalThisYear}
          </h1>
        </div>

        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Bar dataKey="commits" shape={<CustomBar />} />
            <Tooltip
              cursor={{ fill: "#ffffff08" }}
              formatter={(value) => [`${value} commits`, ""]}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.month ?? ""
              }
              contentStyle={{
                background: "#0a0a0a",
                border: "1px solid #414751",
                borderRadius: 0,
                fontFamily: "JetBrains Mono",
                fontSize: 10,
              }}
              labelStyle={{ color: "#8b919d", marginBottom: 4 }}
              itemStyle={{ color: "#e5e2e1" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
