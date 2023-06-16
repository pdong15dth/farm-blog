import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/src/components/Header'
import CssHeader from '@/src/components/CssHeader'
import ScriptHeader from '@/src/components/ScriptHeader'
import AdminSideNav from '@/src/components/admin/AdminSideNav'
import utils from '@/src/utils/constant'

export async function getServerSideProps() {
  const resProduct = await fetch(`${utils.baseURL}/api/admin/product/list-product`)
  const products = await resProduct.json()
  const resFinishProduct = await fetch(`${utils.baseURL}/api/admin/finish-product/list-finish-product`)
  const finishProduct = await resFinishProduct.json()
  const resPosts = await fetch(`${utils.baseURL}/api/admin/news/list-news`)
  const posts = await resPosts.json()
  const resContacts = await fetch(`${utils.baseURL}/api/admin/contact`)
  const contacts = await resContacts.json()

  const resNationals = await fetch(`${utils.baseURL}/api/admin/national/listNational`)

  const nationals = await resNationals.json()

  return {
    props: {
      products,
      finishProduct,
      posts,
      contacts,
      nationals
    },
  }
}

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Head>
        <title>:: Lucid H :: Home</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
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
            <div className="block-header">
              <div className="row">
                <div className="col-lg-5 col-md-8 col-sm-12">
                  <h2>Dashboard</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a
                      href="/admin"><i
                        className="icon-home"></i></a></li>
                    <li className="breadcrumb-item active">Dashboard
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="/admin/product">
                  <div className="card text-center bg-info">
                    <div className="body">
                      <div className="p-15 text-light">
                        <h3>{props.products.length}</h3>
                        <span>Nông Sản</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="/admin/finish-product">
                  <div className="card text-center bg-secondary">
                    <div className="body">
                      <div className="p-15 text-light">
                        <h3>{props.finishProduct.length}</h3>
                        <span>Thành Phẩm</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="/admin/news">
                  <div className="card text-center bg-warning">
                    <div className="body">
                      <div className="p-15 text-light">
                        <h3>{props.posts.length}</h3>
                        <span>Tin Tức</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="/admin/national">
                  <div className="card text-center bg-primary">
                    <div className="body">
                      <div className="p-15 text-light">
                        <h3>{props.nationals.length}</h3>
                        <span>Tỉnh TP / Quốc Gia</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="/admin/contact">
                  <div className="card text-center bg-dark">
                    <div className="body">
                      <div className="p-15 text-light">
                        <h3>{props.contacts.length}</h3>
                        <span>Liên Hệ</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Javascript --> */}
      <ScriptHeader />
    </>
  )

}
export default dynamic(() => Promise.resolve(Home), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>