import { auth } from "@/lib/auth"
import { createFileRoute, redirect } from "@tanstack/react-router"
import {
  FifthSection,
  FirstSection,
  FourthSection,
  Header,
  HomeFooter,
  SecondSection,
  ThirdSection,
} from "@/modules/home/components"

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { data: session } = await auth.getSession()

    if (session) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header />

      <main className="m-auto flex flex-col items-center justify-center gap-8 pt-20 lg:pt-32">
        <FirstSection />

        <div className="w-full divide-y border-y">
          <SecondSection />

          <ThirdSection />

          <FourthSection />

          <FifthSection />
        </div>
      </main>

      <HomeFooter />
    </div>
  )
}
