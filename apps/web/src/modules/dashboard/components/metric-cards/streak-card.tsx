import { useQueryCommits } from "../../hooks"

export function StreakCard() {
  const { data: commits } = useQueryCommits()

  return (
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
        {commits?.longestStreak && commits.longestStreak < 1 ? "DIA" : "DIAS"}
      </h5>
    </div>
  )
}
