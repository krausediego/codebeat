const languageIconSlugs: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  Go: "go",
  Rust: "rust",
  Java: "java",
  "C#": "csharp",
  "C++": "cplusplus",
  C: "c",
  Ruby: "ruby",
  PHP: "php",
  Swift: "swift",
  Kotlin: "kotlin",
  Dart: "dart",
  Shell: "bash",
  HTML: "html5",
  CSS: "css3",
  SCSS: "sass",
  Vue: "vuejs",
  Svelte: "svelte",
  Elixir: "elixir",
  Haskell: "haskell",
  Lua: "lua",
  R: "r",
}

export function getLanguageIcon(name: string): string {
  const slug = languageIconSlugs[name] ?? name.toLowerCase()
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`
}
