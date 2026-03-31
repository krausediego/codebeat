import { useIsFetching } from "@tanstack/react-query"
import {
  useQueryCommits,
  useQueryLanguages,
  useQueryPullRequests,
  useQueryRepos,
} from "../../hooks"
import {
  CustomMetricCardSkeleton,
  CustomMetricCardContent,
  CustomMetricCardRoot,
  CustomMetricCardTitle,
  CustomMetricCardValue,
  CustomMetricCardPercent,
  CustomMetricCardValueDescription,
  CustomMetricDescription,
} from "."
import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useMemo } from "react"
import { HeatmapCalendar } from "@/components/ui/heatmap"
import { Progress } from "@/components/ui/progress"
import { getLanguageColor } from "@/lib/languages"

export function MetricCards() {
  const { data: commits } = useQueryCommits()
  const { data: pullRequests } = useQueryPullRequests()
  const { data: languages } = useQueryLanguages()
  const { data: repos } = useQueryRepos()

  const CustomBar = (props: any) => {
    const { x, y, width, height } = props
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#1a2a3a" />
        <rect x={x} y={y} width={width} height={1} fill="#378ADD" />
      </g>
    )
  }

  const positiveCommitDelta =
    commits?.deltaCommits30d && commits?.deltaCommits30d > 0

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

  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["commits", "pull-requests"].some((key) =>
          query.queryKey.includes(key)
        ),
    }) > 0

  const topRepos = useMemo(() => {
    if (!repos?.data.length) return []

    return [...(repos.data ?? [])]
      .filter((r) => !r.fork) // ignora forks
      .sort(
        (a, b) =>
          new Date(b?.pushed_at ?? "").getTime() -
          new Date(a?.pushed_at ?? "").getTime()
      )
      .slice(0, 6)
  }, [repos])

  console.log("data", Array.isArray(repos?.data))

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CustomMetricCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <>
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

          <ResponsiveContainer width="100%" height={300}>
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

      <div className="space-y-4 rounded-md bg-card p-8">
        <p className="text-xs font-light text-muted-foreground uppercase">
          OFENSIVA ATUAL
        </p>
        <h1 className="text-5xl leading-none font-medium text-card-foreground">
          {commits?.currentStreak}

          <span className="text-sm leading-none font-light text-card-foreground">
            DIAS
          </span>
        </h1>
        <h5 className="text-xs leading-none font-light text-card-foreground">
          RECORDE: {commits?.longestStreak}{" "}
          {/* {commits?.longestStreak < 1 ? "DIA" : "DIAS"} */}
        </h5>
      </div>

      <div className="space-y-4 rounded-md bg-card p-8">
        <p className="text-xs font-light text-muted-foreground uppercase">
          PRS MERGEADAS
        </p>
        <h1 className="text-5xl leading-none font-medium text-emerald-400">
          {pullRequests?.merged}
        </h1>
        <h5 className="text-xs leading-none font-light text-card-foreground">
          {pullRequests?.total} TOTAL · {pullRequests?.open} ABERTA
        </h5>
      </div>

      <HeatmapCalendar
        className="col-span-2"
        title="Atividade de commits"
        data={
          commits?.heatmap.map((data) => {
            return {
              date: data.date,
              value: data.count,
            }
          }) ?? []
        }
        axisLabels
      />

      <div className="space-y-6 rounded-md bg-card p-8">
        <p className="text-xs font-light text-muted-foreground uppercase">
          LINGUAGENS
        </p>
        <div className="space-y-8">
          {languages?.languages.slice(0, 6).map((language) => {
            return (
              <div className="flex items-center gap-2">
                <p className="w-24 shrink-0 text-xs">{language.name}</p>
                <Progress
                  value={language.percentage}
                  style={{ backgroundColor: getLanguageColor(language.name) }}
                />
                <p className="w-8 shrink-0 text-right text-xs">
                  {language.percentage}%
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-4 rounded-md bg-card p-8">
        <p className="text-xs font-light text-muted-foreground uppercase">
          ISSUES
        </p>
        <h1 className="text-5xl leading-none font-medium text-amber-400">
          {pullRequests?.issues.total}
        </h1>
        <h5 className="text-xs leading-none font-light text-card-foreground">
          {pullRequests?.issues.closed} FECHADA · {pullRequests?.issues.open}{" "}
          ABERTA
        </h5>
      </div>

      <div className="space-y-4 rounded-md bg-card p-8">
        <p className="text-xs font-light text-muted-foreground uppercase">
          TOP REPOSITÓRIOS
        </p>
        <div className="divide-y">
          {topRepos?.map((repo) => {
            return (
              <div className="px-6 py-4 transition-colors hover:border-l-2 hover:border-l-primary hover:bg-primary/40">
                <h3 className="text-sm font-semibold uppercase">{repo.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
