'use client'
import React from 'react'
import { adminLinks } from '../../utils/Links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';



// HERE ALIGNMENT IS NOT WORKING

const Sidebar = () => {
    const pathname = usePathname()

  return (
    <aside>
        {adminLinks.map((link)=>{
            const isActivePage = pathname == link.href;
            const variant = isActivePage?'default':'ghost';
            return <Button asChild className='w-full mb-2 capitalize font-normal justify-start ' variant={variant} key={link.href}>

                    <Link  href={link.href} >
                       {link.label}
                    </Link>
            </Button>
        })}
      
    </aside>
  )
}

export default Sidebar



