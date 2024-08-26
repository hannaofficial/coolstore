import React from 'react'
import { adminLinks } from '../../utils/Links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
    const pathname = usePathname()

  return (
    <aside>
        {adminLinks.map((link)=>{
            const isActivePage = pathname == link.href;
            const variant = isActivePage?'secondary':'ghost';
            return <Button asChild className='w-full mb-2 capitalize font-normal' variant={variant}>

                    <Link key={link.href} href={link.href}>
                       {link.label}
                    </Link>
            </Button>
        })}
      
    </aside>
  )
}

export default Sidebar
