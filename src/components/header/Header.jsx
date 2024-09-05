import React from 'react'
import './header.css'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link to='/' className='logo'>PrimeFlix 🔥</Link>
      <Link to='/favoritos' className='favoritos'>Meus Filmes</Link>
    </header>
  )
}

export default Header