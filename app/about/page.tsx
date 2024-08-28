import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"


function About(){
  
  return (
    <section>
    <h1 className='flex flex-wrap gap-2 sm:gap-x-2 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl'>
    
      <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white'>
        store
      </span>
      .in
    </h1>
    <p className='mt-6 text-3xl text-center tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
      Products coming soon
    </p>
    <div className="grid gap-8 place-items-center font-thin ">

    <p className="mt-16 text-2xl tracking-wide  ">Developing by Hannanur</p>
    <Link href="https://github.com/hannaofficial" target="_blank" className="flex gap-4 items-center">
      <Image src={"/images/hanna.jpeg"} alt="profile" height={100} width={100} className="rounded-full w-16 h-16 transform hover:scale-110 transition-all duration-300 border border-blue-500 shadow-lg" priority/>
      <Link href="https://github.com/hannaofficial">
          <FaGithub className="w-6 h-6"/>
      </Link>
      <Link href="https://www.linkedin.com/in/hannaofficial26/" target="_blank">
          <FaLinkedin className="w-6 h-6"/>
      </Link>
    </Link>
    </div>
  </section>)
}

export default About