export default function Header() {
  return <nav className="navbar navbar-fixed-top">
    <div className="container">
      <div className="navbar-brand">
        <a href="index.html"><img
          src="https://www.svgrepo.com/show/223051/admin.svg"
          alt="Lucid Logo" className="img-responsive logo" width={50} height={25}/></a>
      </div>

      <div className="navbar-right">
        <form id="navbar-search" className="navbar-form search-form">
          <input className="form-control"
            placeholder="Search here..." type="text" />
          <button type="button" className="btn btn-default"><i
            className="icon-magnifier"></i></button>
        </form>
        <div id="navbar-menu">
          <ul className="nav navbar-nav">
            <li>
              <div className="user-account margin-0">
                <div className="dropdown mt-0">
                  <a href="#"
                    className="dropdown-toggle user-name"
                    data-toggle="dropdown">
                    <img src="../../assets/images/user.png"
                      className="rounded-circle user-photo"
                      alt="User Profile Picture" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-right account">
                    <li>
                      <span>Welcome,</span>
                      <strong>Alizee Thomas</strong>
                    </li>
                    <li className="divider"></li>
                    <li><a href="page-profile2.html"><i
                      className="icon-user"></i>My
                      Profile</a></li>
                    <li><a href="app-inbox.html"><i
                      className="icon-envelope-open"></i>Messages</a>
                    </li>
                    <li><a href="#"><i
                      className="icon-settings"></i>Settings</a>
                    </li>
                    <li className="divider"></li>
                    <li><a href="page-login.html"><i
                      className="icon-power"></i>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-btn">
        <button className="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbar"
          aria-expanded="false">
          <i className="lnr lnr-menu fa fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
}
