import { Menu, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { MenuItems, UserManagement } from "."
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Sheet>
      <header className="flex h-16 w-full items-center justify-between border-b p-4">
        <div className="flex items-center gap-8">
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="flex text-primary lg:hidden"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <h1 className="w-52 text-xs text-primary uppercase">{title}</h1>

          <InputGroup className="hidden w-auto lg:flex">
            <InputGroupAddon>
              <Search className="text-primary" />
            </InputGroupAddon>
            <InputGroupInput placeholder="BUSCA_NO_SISTEMA..." />
          </InputGroup>
        </div>

        <UserManagement />
      </header>

      <SheetContent side="left">
        <MenuItems />
      </SheetContent>
    </Sheet>
  )
}
