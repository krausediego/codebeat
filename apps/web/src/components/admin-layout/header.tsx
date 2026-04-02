import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { UserManagement } from "."
import { Button } from "../ui/button"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-8">
        <Button
          size="icon"
          variant="outline"
          className="block lg:hidden"
        ></Button>

        <h1 className="w-52 text-xs text-primary uppercase">{title}</h1>

        <InputGroup className="hidden w-auto lg:flex">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="SEARCH_SYSTEM..." />
        </InputGroup>
      </div>

      <UserManagement />
    </header>
  )
}
