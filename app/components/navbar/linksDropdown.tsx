import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/utils/Links';
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton } from '@clerk/nextjs';
import SignOutLink from './signOutLink';
import UserIcon from './userIcon';


const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button  variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='h-6 w-6'/>
          <UserIcon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <SignUpButton mode='modal'>
            <button className='w-full text-left'>Register</button>
          </SignUpButton>
          <DropdownMenuSeparator/>
        </SignedOut>
        <SignedIn>
          {links.map((link)=>{
            return <DropdownMenuItem key={link.href}>
                  <Link href={link.href} className='capitalize w-full'>{link.label}</Link>
            </DropdownMenuItem>
          })}
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <SignOutLink/>
          </DropdownMenuItem>
        </SignedIn>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
