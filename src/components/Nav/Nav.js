import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Nav.scss'

export const Nav = () => (
  <div className="pd-nav">
    <Link to='/siftFinance' activeClassName='nav-on'>
      <span>精选</span>
    </Link>
    <Link to='/stewardList' activeClassName='nav-on'>
      <span>94管家</span>
    </Link>
  </div>
)
export default Nav
