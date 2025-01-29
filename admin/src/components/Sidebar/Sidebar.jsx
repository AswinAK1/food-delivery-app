import React from 'react'
import '../Sidebar/Sidebar.css'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to={'/add'} className="sidebar-options">
        <img src={assets.add_icon} alt="" />
        <p>Add Items</p>
      </NavLink>
      <NavLink to={'/list'} className="sidebar-options">
        <img src={assets.order_icon} alt="" />
        <p>List Items</p>
      </NavLink>
      <NavLink to={'/order'} className="sidebar-options">
        <img src={assets.order_icon} alt="" />
        <p>Order Items</p>
      </NavLink>
    </div>
  )
}

export default Sidebar