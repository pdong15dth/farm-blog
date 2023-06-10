
export default function AdminSideNav() {

  return <div className="main_menu">
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="navbar-collapse align-items-center collapse"
          id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item dropdown active">
              <a href="/admin"
                className="nav-link">
                <i className="icon-speedometer"></i>Dashboard
              </a>
            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="/admin/product"
                className="nav-link dropdown-toggle"><i
                className="icon-grid"></i>
                <span>Danh Sách Nông sản</span></a>
            </li>
            <li className="nav-item dropdown mega-menu">
              <a href="/admin/finish-product"
                className="nav-link"><i
                  className="icon-docs"></i>
                <span>Danh Sách Thành Phẩm</span></a>
            </li>
            <li className="nav-item dropdown">
              <a href="/admin/news"
                className="nav-link"><i
                  className="icon-lock"></i>
                <span>Danh Sách Tin tức</span></a>
            </li>
            <li className="nav-item dropdown">
              <a href="/admin/national"
                className="nav-link"><i
                  className="icon-pencil"></i>
                <span>Danh Sách Khu Vực</span></a>
            </li>
            <li className="nav-item dropdown">
              <a href="/admin/contact"
                className="nav-link"><i
                  className="icon-pencil"></i>
                <span>Danh Sách Liên Hệ</span></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
}