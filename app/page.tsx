import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import LandingImage from '@/assets/main.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Image src={Logo} alt='Logo' />
      </header>

      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            Job <span className='text-primary'>Tracking</span> App
          </h1>

          <p className='leading-loose max-w-md mt-4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            repellendus veritatis praesentium deleniti consequatur. Sit fugit
            voluptatibus aliquam necessitatibus aut! Odit iure obcaecati saepe
            necessitatibus ullam doloribus tempore dolores soluta.
          </p>

          <Button asChild className='mt-4'>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>

        <Image
          src={LandingImage}
          alt='landing image'
          className='hidden lg:block'
        />
      </section>
    </main>
  )
}
