import { DocumentContext } from "next/document"
import utils from "../utils/constant"
import { useEffect, useState } from "react"
import Link from "next/link"

export async function getStaticProps() {
  const res1 = await fetch(`${utils.baseURL}/api/client/national/index`)
  const res2 = await fetch(`${utils.baseURL}/api/client/country/index`)
  const national = await res1.json()
  const countries = await res2.json()
  return {
    props: {
      national,
      countries,
    },
  }
}
export default function SideNav(props) {
  const [national, setNational] = useState([])
  const [countries, setCountries] = useState([])
  useEffect(() => {
    fetch(`${utils.baseURL}/api/client/national`).then(res => res.json()).then(results => {
      console.log(results)
      setNational(results)
    })
    fetch(`${utils.baseURL}/api/client/country`).then(res => res.json()).then(results => {
      console.log(results)
      setCountries(results)
    })
  }, [])

  return <div className="main_menu">
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="navbar-collapse align-items-center collapse"
          id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item dropdown active">
              <a href="#"
                className="nav-link"
                data-toggle="dropdown">
                <i className="icon-speedometer"></i> Trang chủ
              </a>
            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"><i
                  className="icon-grid"></i>
                <span>Nông sản</span></a>
              <div
                className="dropdown-menu animated bounceIn  colmun2-menu">
                <div className="row clearfix">
                  <div className="col-lg-6">
                    <div className="mega-list">
                      <ul className="list-unstyled">
                        <li><label>Trong nước</label></li>
                        {
                          countries.map((item, index) => {
                            return <li key={index}><a
                              href={`/nong-san/${item.slug}`}>{item.countryName}</a></li>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mega-list">
                      <ul className="list-unstyled">
                        <li><label>Quốc tế</label></li>
                        {
                          national.map((item, index) => {
                            return <li key={index}><a
                              href="map-google.html">{item.nationalName}</a></li>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
              <a href="#"
                className="nav-link"
                data-toggle="dropdown"><i
                  className="icon-pencil"></i>
                <span>Liên hệ</span></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
}