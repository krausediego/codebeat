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
  comingSoon?: boolean
}

export const menuItems: MenuItemsProps[] = [
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
    comingSoon: true,
  },
  {
    icon: Network,
    title: "network",
    href: "/network",
    comingSoon: true,
  },
  {
    icon: Settings,
    title: "configurações",
    href: "/settings",
  },
]
