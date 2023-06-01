
export default function SideNav() {
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
                        <li><a
                          href="map-google.html">Google
                          Map</a></li>
                        <li><a
                          href="map-yandex.html">Yandex
                          Map</a></li>
                        <li><a
                          href="map-jvectormap.html">jVector
                          Map</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mega-list">
                      <ul className="list-unstyled">
                        <li><label>Quốc tế</label></li>
                        <li><a
                          href="file-dashboard.html">Dashboard</a>
                        </li>
                        <li><a
                          href="file-documents.html">Documents</a>
                        </li>
                        <li><a
                          href="file-media.html">Media</a>
                        </li>
                        <li><a
                          href="file-images.html">Images</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="#"
                className="nav-link"
                data-toggle="dropdown"><i
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