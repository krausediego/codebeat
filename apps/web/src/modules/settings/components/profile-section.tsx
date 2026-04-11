import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useQueryProfile } from "@/hooks"
import { AtSign, ExternalLink, Lock, User } from "lucide-react"

export function ProfileSection() {
  const { data: profile } = useQueryProfile()

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-xs text-primary uppercase">profile config</h3>

      <div className="flex flex-1 justify-between gap-8">
        <div className="w-full space-y-4">
          <Field>
            <FieldLabel>Nome</FieldLabel>

            <InputGroup>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput value={profile?.name ?? ""} />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Usuário</FieldLabel>

            <InputGroup className="opacity-50">
              <InputGroupAddon>
                <AtSign />
              </InputGroupAddon>
              <InputGroupInput readOnly value={profile?.login ?? ""} />
              <InputGroupAddon align="inline-end">
                <Lock />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <div>
            <Label>Link perfil</Label>

            <div className="flex items-center justify-between border-b border-dashed py-2 pr-2">
              <a
                href={`http://codebeat.app/u/${profile?.login}`}
                target="_blank"
                className="text-sm text-primary"
              >
                codebeat.app/u/{profile?.login}
              </a>

              <ExternalLink className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Field>
          <FieldLabel>Bio</FieldLabel>

          <Textarea placeholder="> ENTER_BIO..." className="h-full" />
        </Field>
      </div>
      <Button className="ml-auto uppercase">Editar perfil</Button>
    </div>
  )
}
