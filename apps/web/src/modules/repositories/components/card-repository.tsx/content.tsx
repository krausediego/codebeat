import { getLanguageColor } from "@/lib/languages"
import { ReposData } from "../../types"
import { Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface CardRepositoryContentProps {
  data: ReposData
}

export function CardRepositoryContent({ data }: CardRepositoryContentProps) {
  const pushedAgo = formatDistanceToNow(new Date(data?.pushed_at as string), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <div className="flex h-48 flex-col p-6">
      {/* header */}
      <div className="flex items-center gap-2">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: getLanguageColor(data.language ?? "") }}
        />
        <h3
          className="text-xs uppercase"
          style={{ color: getLanguageColor(data.language ?? "") }}
        >
          {data.language ?? "N/A"}
        </h3>
        <div className="ml-auto flex items-center gap-1">
          <Star className="size-3 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            {data.stargazers_count}
          </p>
        </div>
      </div>

      {/* nome + descrição */}
      <div className="mt-3 space-y-1">
        <h1 className="text-base font-semibold uppercase">{data.name}</h1>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {data.description ?? "Sem descrição"}
        </p>
      </div>

      {/* rodapé — colado na parte inferior */}
      <div className="mt-auto flex items-center justify-between pt-4">
        <p className="text-xs text-muted-foreground uppercase">
          {data.size} kb
        </p>
        <p className="text-xs text-muted-foreground">{pushedAgo}</p>
      </div>

      {/* barra de progresso baseada no size */}
      <div className="mt-2 h-px w-full bg-muted">
        <div
          className="h-px bg-primary"
          style={{ width: `${Math.min((data.size / 5000) * 100, 100)}%` }}
        />
      </div>
    </div>
  )
}
