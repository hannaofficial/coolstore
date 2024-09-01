import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-3xl tracking-tight sm:text-5xl">
        Elevate Your Walls with Art That Inspires
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
        Discover captivating posters and art that bring inspiration to your space. Shop now and elevate your walls with creativity.
        </p>
        <Button asChild size='lg' className="mt-10">
            <Link href='/products'>Our Products</Link>
        </Button>
      </div>
      <div>
        <HeroCarousel/>
      </div>

    </section>
  )
}

export default Hero
