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
import Footer from '@/src/components/Footer'


export async function getStaticProps() {
  const res = await fetch(`${utils.baseURL}/api/client/news/list-news`)
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const RenderNewsList = () => {

    return props.posts.map((item, index) => {

      return <div className="col-lg-4" key={index}>
        <div className="card single_post">
          <div className="body">
            <div className="img-post">
              <a href={`/tin-tuc/${item.slug}/${item.id}`}>
                <img className="d-block img-fluid" src={item.image} alt="First slide" />
              </a>
            </div>
            <h3><a href={`/tin-tuc/${item.slug}/${item.id}`}>{item.title}</a></h3>
            <p>{item.description}</p>
          </div>
          <div className="footer">
            <div className="actions">
              <a href={`/tin-tuc/${item.slug}/${item.id}`} className="btn btn-outline-secondary">Xem thêm</a>
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
                  <h2>Tin Tức</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a
                      href="index.html"><i
                        className="icon-home"></i></a></li>
                    <li className="breadcrumb-item active">Tin Tức
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card">
                  <div className="body">
                    <div className="row">
                      {RenderNewsList()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {/* <!-- Javascript --> */}
      <ScriptHeader />
    </>
  )

}
export default dynamic(() => Promise.resolve(Home), { ssr: false })
