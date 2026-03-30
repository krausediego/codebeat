import { auth } from "@/lib/auth"
import { useMutation } from "@tanstack/react-query"

export function useSignIn() {
  return useMutation({
    mutationFn: async function handleConnectGithub() {
      const { data, error } = await auth.signIn.social({
        provider: "github",
        callbackURL: "http://localhost:5173",
      })

      if (error) throw error

      return data
    },
  })
}
