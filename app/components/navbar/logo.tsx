import React from 'react'
import { PiSmileyMelting } from "react-icons/pi";
import { Button } from '../ui/button';
import Link from 'next/link';

const Logo = () => {
  return (
    <Button size='icon' className='' asChild>
      <Link href='/'>
         <PiSmileyMelting className='h-6 w-6 '/>
      </Link>
    </Button>
  )
}

export default Logo
