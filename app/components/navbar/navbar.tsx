import React from 'react'
import Container from '../global/container'
import Logo from './logo'
import NavSearch from './navSearch'
import CartButton from './cartButton'
import Darkmode from './Darkmode'
import LinksDropdown from './linksDropdown'
import { Suspense } from 'react'


const Navbar = () => {
  return (
    <nav className='border-b'>
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-4 flex-wrap py-8'>
        <Logo/>
        <Suspense>

        <NavSearch/>
        </Suspense>
        <div className='flex gap-4 items-center'>
          <CartButton/>
          <Darkmode/>
          <LinksDropdown/>
        </div>
      </Container>

    </nav>
  )
}

export default Navbar
