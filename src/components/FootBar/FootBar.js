import React from 'react'
import { IndexLink, Link } from 'react-router'
import './FootBar.scss'

export const FootBar = () => (
  <div className="foot-bar">
    <Link to="/Member/Us" id="contact_us">联系我们</Link>
    <Link to="/Member/Login">账户中心</Link>
    <Link to="/siftFinance">理财中心</Link>
  </div>
)
export default FootBar
