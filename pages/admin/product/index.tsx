import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/src/components/Header'
import SideNav from '@/src/components/SideNav'
import Script from 'next/script'
import CssHeader from '@/src/components/CssHeader'
import ScriptHeader from '@/src/components/ScriptHeader'
import utils from '@/src/utils/constant'
import authService from '@/src/services/authService/auth.service'
import router from 'next/router'
import AdminSideNav from '@/src/components/admin/AdminSideNav'
import HeaderTitle from '@/src/components/HeaderTitle'


export async function getStaticProps() {
  const res = await fetch(`${utils.baseURL}/api/admin/product/list-product`)
  const results = await res.json()
  return {
    props: {
      results,
    },
  }
}
const IndexProducts = ({ results }) => {
  const [products, setProducts] = useState(results)
  const [loadPageState, setLoadPageState] = useState(false)
  useEffect(() => {
    setLoadPageState(true)
    const isAdmin = authService.checkAuthAdmin();
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [])

  const removeItem = (id) => {
    console.log(id)
    var body = { id }
    fetch(`${utils.baseURL}/api/admin/product/delete`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => response.json()).then(result => {
      console.log(result)
      const newList = products.filter((item) => item.id !== id);
      setProducts(newList);
    }).catch(error => console.log('error', error));
  }
  const ListProducts = () => {
    if (products == null) {
      console.log("news null roi dmm")
      return
    }

    return products?.map((item, index) => {
      console.log(item.finishProduct)
      return (
        <tr key={index}>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.title}</span>
          </td>
          <td>
            <img src={item.image} className="image description" width={100} alt="" />
          </td>
          <td>
            {
              item.finishProduct.map((item2, index) => {
                return <div key={index}>
                  <a href={`/admin/finish-product/edit?id=${item2?.id}`}><i className="zmdi zmdi-pin"></i>{item2.title}</a>
                  <br />
                </div>
              })
            }
          </td>
          <td>
            <span className="badge badge-success m-l-10 hidden-sm-down">{item.national.name}</span>
          </td>
          <td>
            <span className="badge badge-default m-l-10 hidden-sm-down">{item.published ? "Public" : "Review"}</span>
          </td>
          <td>
            <a href={`/admin/product/edit?id=${item?.id}`} type="button" className="btn btn-info" title="Edit"><i className="fa fa-edit" ></i></a>
            &nbsp;
            <button type="button" data-type="confirm" className="btn btn-danger js-sweetalert" title="Delete" onClick={() => removeItem(item.id)}><i className="fa fa-trash-o"></i></button>
          </td>
          <td>
            <a href={`/admin/product/copy-product?id=${item?.id}`} type="button" className="btn btn-info" title="Edit"><i className="fa fa-plus" ></i></a>
          </td>
        </tr>
      )
    })
  }
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
            <HeaderTitle title="Nông Sản" />
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card">
                  <div className="header" style={{ float: 'right' }}>
                    <a href="/admin/product/create" className="btn btn-outline-secondary">Thêm nông sản</a>
                  </div>

                  <div className="body">
                    <div className="table-responsive">
                      <table className="table table-hover m-b-0 c_list">
                        <thead>
                          <tr>
                            <th>Tên Nông Sản</th>
                            <th>Hình ảnh</th>
                            <th>Thành Phẩm</th>
                            <th>Tỉnh Thành / QG</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                            <th>Thêm nông sản cho tỉnh khác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ListProducts()}
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
export default dynamic(() => Promise.resolve(IndexProducts), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>