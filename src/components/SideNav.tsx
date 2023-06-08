import { DocumentContext } from "next/document"
import utils from "../utils/constant"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function SideNav(props) {

  return <div className="main_menu">
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="navbar-collapse align-items-center collapse"
          id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item dropdown active">
              <a href="/"
                className="nav-link">
                <i className="icon-speedometer"></i> Trang chủ
              </a>
            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="/nong-san"
                className="nav-link dropdown-toggle"><i
                  className="icon-grid"></i>
                <span>Nông sản</span></a>

            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="/thanh-pham"
                className="nav-link"><i
                  className="icon-docs"></i>
                <span>Thành Phẩm</span></a>
            </li>
            <li className="nav-item dropdown">
              <a href="/tin-tuc"
                className="nav-link"><i
                  className="icon-lock"></i>
                <span>Tin tức</span></a>

            </li>
            <li className="nav-item dropdown">
              <a href="/lien-he"
                className="nav-link"><i
                  className="icon-pencil"></i>
                <span>Liên hệ</span></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
}