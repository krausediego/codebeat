export const languageColors: Record<string, string> = {
  TypeScript: "#60a5fa", // blue-400
  JavaScript: "#fbbf24", // amber-400
  Python: "#818cf8", // indigo-400
  Go: "#34d399", // emerald-400
  Rust: "#fb923c", // orange-400
  Java: "#f97316", // orange-500
  "C#": "#4ade80", // green-400
  "C++": "#f472b6", // pink-400
  C: "#94a3b8", // slate-400
  Ruby: "#f87171", // red-400
  PHP: "#a78bfa", // violet-400
  Swift: "#fb923c", // orange-400
  Kotlin: "#c084fc", // purple-400
  Dart: "#22d3ee", // cyan-400
  Shell: "#86efac", // green-300
  HTML: "#f87171", // red-400
  CSS: "#818cf8", // indigo-400
  SCSS: "#f472b6", // pink-400
  Vue: "#4ade80", // green-400
  Svelte: "#fb923c", // orange-400
  Elixir: "#c084fc", // purple-400
  Haskell: "#a78bfa", // violet-400
  Lua: "#60a5fa", // blue-400
  R: "#34d399", // emerald-400
}

export function getLanguageColor(name: string) {
  return languageColors[name] ?? "#8b949e"
}
