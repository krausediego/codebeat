import { ChartLine, Code2, FileText, Share2, Trophy, Zap } from "lucide-react"

export const SECTION_CARDS = [
  {
    icon: Zap,
    title: "Atividade em tempo real",
    description:
      "Sincronização instantânea com seus repositórios para manter suas métricas sempre atualizadas.",
  },
  {
    icon: ChartLine,
    title: "Padrões de produtividade",
    description:
      "Descubra em quais dias e horários você faz seus melhores commits e PRs.",
  },
  {
    icon: Share2,
    title: "Perfil compartilhável",
    description:
      "Um link público elegante para você adicionar ao seu currículo ou portfólio.",
  },
  {
    icon: Code2,
    title: "Análise de linguagens",
    description:
      "Acompanhe a evolução do seu stack tecnológico ao longo de meses ou anos.",
  },
  {
    icon: FileText,
    title: "README generator",
    description:
      "Gere widgets dinâmicos em Markdown para colar direto no seu perfil do GitHub.",
  },
  {
    icon: Trophy,
    title: "Rankings de grupo",
    description:
      "Crie leaderboards com sua equipe ou amigos para uma competição saudável.",
  },
]

export const STEPS_CARDS = [
  {
    order: "01",
    title: "Conecte sua conta",
    description:
      "Faça login com seu GitHub. Nós pedimos apenas permissões de leitura para acessar seus repositórios públicos.",
  },
  {
    order: "02",
    title: "Aguarde a análise",
    description:
      "Nosso motor processa seu histórico de commits, PRs e issues. Geralmente leva menos de 30 segundos.",
  },
  {
    order: "03",
    title: "Explore seu dashboard",
    description:
      "Pronto. Seu perfil está criado, suas métricas estão visíveis e você já pode compartilhar seu link.",
  },
]

export const MENU_ITEMS = [
  {
    id: "features",
    name: "Features",
  },
  {
    id: "how-to-work",
    name: "Como funciona",
  },
]
