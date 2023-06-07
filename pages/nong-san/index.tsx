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
import AdminSideNav from '@/src/components/admin/AdminSideNav'
import utils from '@/src/utils/constant'
import { DocumentContext } from 'next/document'

export async function getServerSideProps(ctx: DocumentContext) {

  const resNational = await fetch(`${utils.baseURL}/api/client/national`)
  const nationals = await resNational.json()
  const resContries = await fetch(`${utils.baseURL}/api/client/country`)
  const contries = await resContries.json()
  const res = await fetch(`${utils.baseURL}/api/client/product/list-product`)
  const products = await res.json()
  return {
    props: {
      products,
      nationals,
      contries
    },
  }
}

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    console.log("props.products", props.products)
    setIsLoaded(true)
  }, [])

  const RenderNewsList = () => {

    return props.products.map((item, index) => {

      return <div className="col-lg-6" key={index}>
        <div className="card single_post">
          <div className="body">
            <div className="img-post">
              <a href={`/nong-san/${item.slug}/${item.id}`}>
                <img className="d-block img-fluid" src={item.image} alt="First slide" />
              </a>
            </div>
            <h3><a href={`/nong-san/${item.slug}/${item.id}`}>{item.title}</a></h3>
            <p>{item.description}</p>
          </div>
          <div className="footer">
            <div className="actions">
              <a href={`/nong-san/${item.slug}/${item.id}`} className="btn btn-outline-secondary">Xem thêm</a>
            </div>
            {/* <ul className="stats">
              <li><a href="#">General</a></li>
              <li><a href="#" className="icon-heart">28</a></li>
              <li><a href="#" className="icon-bubbles">128</a></li>
            </ul> */}
          </div>
        </div>
      </div>
    })
  }
  if (isLoaded)
    return (
      <>
        <Head>
          <title>:: Tin Tức ::</title>
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
        <link rel="stylesheet" href="../../assets/css/blog.css" />

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

          <SideNav />

          <div id="main-content">
            <div className="container">
              <div className="block-header">
                <div className="row">
                  <div className="col-lg-5 col-md-8 col-sm-12">
                    <h2>Thành Phẩm</h2>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><a
                        href="index.html"><i
                          className="icon-home"></i></a></li>
                      <li className="breadcrumb-item active">Thành Phẩm
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
              <div className="row clearfix">
                <div className="col-lg-8 col-md-12 left-box">
                  <div className="card">
                    <div className="header">
                      <h2>Nông Sản</h2>
                    </div>
                    <div className="body">
                      <div className="row">
                        {RenderNewsList()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 right-box">
                  <div className="card">
                    <div className="body search">
                      <div className="input-group m-b-0">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="icon-magnifier"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Search..." />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="header">
                      <h2>Trong nước</h2>
                    </div>
                    <div className="body widget">
                      <ul className="list-unstyled categories-clouds m-b-0">
                        {
                          props.contries.map((item, index) => {
                            return <>  <li key={index}><a href="#">{item.countryName}</a></li></>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className="card">
                    <div className="header">
                      <h2>Quốc tế</h2>
                    </div>
                    <div className="body widget">
                      <ul className="list-unstyled categories-clouds m-b-0">
                        {
                          props.nationals.map((item, index) => {
                            return <>  <li key={index}><a href="#">{item.nationalName}</a></li></>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className="card">
                  <div className="header">
                    <h2>Nhận thông báo các bài viết mới nhất qua Email</h2>
                  </div>
                  <div className="body widget newsletter">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Nhập Email" />
                      <div className="input-group-append">
                        <span className="input-group-text"><i className="icon-paper-plane"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
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
