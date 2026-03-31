import { Progress } from "@/components/ui/progress"
import { getLanguageColor } from "@/lib/languages"
import { useQueryLanguages } from "../../hooks"

export function LanguagesCard() {
  const { data: languages } = useQueryLanguages()

  return (
    <div className="space-y-6 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        LINGUAGENS
      </p>
      <div className="space-y-8">
        {languages?.languages.slice(0, 3).map((language) => {
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
  )
}
