"use client"

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'

const NavBar = () => {

  const pathname = usePathname();

      return (
          <nav className="navbar navbar-expand-lg sticky-top shadow">
            <div className="container-fluid">
            <Link className="navbar-brand" href="pages/home">
              <Image src="/images/AleggoLogo.png" alt="Aleggo logo" height="30" width="30" className="d-inline-block align-top"/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${pathname.startsWith('/home') ? 'active' : ''}`} href="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname.startsWith('/customers') ? 'active' : ''}`} href="/customers">Customers</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname.startsWith('/users') ? 'active' : ''}`} href="/users/usersList">Users</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tools
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Tool 1</a></li>
                    <li><a className="dropdown-item" href="#">Tool 2</a></li>
                    <li><a className="dropdown-item" href="#">Tool 3</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Economy</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Analytics</a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Joe Blow
                <Image src="/images/profile.png" alt="Picture of user logged in" height="30" width="30"/>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Home</a></li>
                  <div className="dropdown-divider"></div>
                  <li><Link className="dropdown-item" href="/api/auth/logout">Logout</Link></li>
              </ul>
            </div>
          </div>
      </nav>

      )

}

export default NavBar
