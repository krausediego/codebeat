import { getLanguageIcon } from "@/lib/language-icons"
import { getLanguageColor } from "@/lib/languages"
import { Code2, Flame, GitPullRequest } from "lucide-react"
import {
  useQueryCommits,
  useQueryLanguages,
  useQueryPullRequests,
} from "../../hooks"
import { CustomBadge } from "./custom-badge"

export function ProfileBadges() {
  const { data: languages } = useQueryLanguages()
  const { data: commits } = useQueryCommits()
  const { data: pullRequests } = useQueryPullRequests()

  const topLanguage = languages?.languages?.[0].name as string

  const color = getLanguageColor(topLanguage)

  return (
    <div className="flex items-center gap-3">
      <CustomBadge
        icon={Code2}
        description={`Top: ${topLanguage}`}
        color={color}
      />
      <CustomBadge
        icon={Flame}
        description={`${String(commits?.currentStreak)} dias de ofensiva`}
        color="#fbbf24"
      />
      <CustomBadge
        icon={GitPullRequest}
        description={`${String(pullRequests?.total)} PRs`}
        color="#c084fc"
      />
    </div>
  )
}
