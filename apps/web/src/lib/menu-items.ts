import {
  Archive,
  GitFork,
  LucideIcon,
  Network,
  Settings,
  TerminalSquare,
} from "lucide-react"

interface MenuItemsProps {
  icon: LucideIcon
  title: string
  href: string
}

export const menuItems = [
  {
    icon: TerminalSquare,
    title: "terminal",
    href: "/dashboard",
  },
  {
    icon: Archive,
    title: "repositórios",
    href: "/repositories",
  },
  {
    icon: GitFork,
    title: "pipelines",
    href: "/pipelines",
  },
  {
    icon: Network,
    title: "network",
    href: "/network",
  },
  {
    icon: Settings,
    title: "configurações",
    href: "/settings",
  },
]
