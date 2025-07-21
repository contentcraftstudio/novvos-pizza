import { HeroSection } from "@/components/hero-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { MenuSection } from "@/components/menu-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PhilosophySection />
      <MenuSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
