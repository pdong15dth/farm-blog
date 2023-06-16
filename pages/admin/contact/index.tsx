import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/src/components/Header'
import CssHeader from '@/src/components/CssHeader'
import ScriptHeader from '@/src/components/ScriptHeader'
import utils from '@/src/utils/constant'
import authService from '@/src/services/authService/auth.service'
import router from 'next/router'
import AdminSideNav from '@/src/components/admin/AdminSideNav'
import HeaderTitle from '@/src/components/HeaderTitle'


export async function getServerSideProps() {
  const res = await fetch(`${utils.baseURL}/api/admin/contact`)

  const contacts = await res.json()
  return {
    props: {
      contacts,
    },
  }
}
const Index = ({ contacts }) => {
  const [contactsData, setContacts] = useState(contacts)

  useEffect(() => {
    const isAdmin = authService.checkAuthAdmin();
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [])

  const removeItem = (id) => {
    console.log(id)
    var body = { id }
    fetch(`${utils.baseURL}/api/admin/contact/update`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => response.json()).then(async result => {
      console.log(result)
      const res = await fetch(`${utils.baseURL}/api/admin/contact`)
      const contacts = await res.json()
      setContacts(contacts);
    }).catch(error => console.log('error', error));
  }

  const ListNews = () => {
    if (contactsData == null) {
      console.log("news null roi dmm")
      return
    }

    return contactsData?.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.id}</span>
          </td>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.firstName} {item.lastName}</span>
          </td>
          <td>
            <address><i className="zmdi zmdi-pin"></i>{item.address}</address>
          </td>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.phone}</span>
          </td>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.message}</span>
          </td>
          <td>
            <span className={`badge badge-${!item.isActive ? "dark" : "success"} m-l-10 hidden-sm-down`}>{!item.isActive ? "Chưa liên hệ" : "Đã liên hệ"}</span>
          </td>
          <td>
            <button type="button" data-type="confirm" className="btn btn-success js-sweetalert" title="Delete" onClick={() => removeItem(item.id)}><i className="fa fa-check"></i></button>
          </td>
        </tr>
      )
    })
  }
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Head>
        <title>:: Lucid H :: Home</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Lucid Bootstrap 4.1.1 Admin Template" />
        <meta name="author" content="WrapTheme, design by: ThemeMakker.com" />

        <link rel="icon" href="../../favicon.ico" type="image/x-icon" />

      </Head>
      {/* <!-- VENDOR CSS --> */}
      <CssHeader />

      {/* <!-- Page Loader --> */}
      {/* <div className="page-loader-wrapper">
        <div className="loader">
          <div className="m-t-30">
            <img
              src="https://www.wrraptheme.com/templates/lucid/html/assets/images/logo-icon.svg"
              width="48" height="48" alt="Lucid" /></div>
          <p>Please wait...</p>
        </div>
      </div> */}
      {/* <!-- Overlay For Sidebars --> */}

      <div id="wrapper">
        <Header />

        <AdminSideNav />

        <div id="main-content">
          <div className="container">
            <HeaderTitle title="Thêm Tỉnh / TP" />

            <div className="row clearfix">
              <div className="col-lg-12">

                <div className="card">
                  <div className="header">
                    <h2>Form</h2>
                  </div>
                  <div className="body">
                    {/* {FormCreateCountry()} */}
                  </div>

                  <div className="body">
                    <div className="table-responsive">
                      <table className="table table-hover m-b-0 c_list">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Họ và Tên</th>
                            <th>Địa Chỉ</th>
                            <th>Số Điện Thoại</th>
                            <th>Tin Nhắn</th>
                            <th>Trạng thái</th>
                            <th>Hành Động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ListNews()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* <!-- Javascript --> */}
      <ScriptHeader />
    </>
  )

}
export default dynamic(() => Promise.resolve(Index), { ssr: false })
