import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Fragment, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/src/components/Header'
import SideNav from '@/src/components/SideNav'
import Script from 'next/script'
import { url } from 'inspector'
import CssHeader from '@/src/components/CssHeader'
import ScriptHeader from '@/src/components/ScriptHeader'
import utils from '@/src/utils/constant'
import { DocumentContext } from 'next/document'
import { toast } from 'react-toastify'
import Footer from '@/src/components/Footer'


export async function getServerSideProps(ctx: DocumentContext) {

  const res = await fetch(`${utils.baseURL}/api/client/product/popular-product`)
  const popularPosts = await res.json()
  console.log(ctx.query)
  return {
    props: {
      popularPosts
    },
  }
}

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const [error, setError] = useState("")

  const postFormContact = async (event) => {
    event.preventDefault();
    try {
      var err = []
      setIsLoaded(false)

      var data = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        phone: event.target.phone.value,
        address: event.target.address.value,
        message: event.target.message.value,
      }

      console.log(data)
      fetch("/api/client/contact/create", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        setError("Gửi liên hệ thành công")
        if (res.code == 401) {
          setError(res.message)
          return
        }
        setIsLoaded(true)
      }).catch(error => {
      })
    } catch (error) {
      setIsLoaded(false)
    }
  }
  return (
    <>
      <Head>
        <title>Liên Hệ</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Lucid Bootstrap 4.1.1 Admin Template" />
        <meta name="author" content="WrapTheme, design by: ThemeMakker.com" />

        <link rel="icon" href="/../../favicon.ico" type="image/x-icon" />

      </Head>
      {/* <!-- VENDOR CSS --> */}
      <CssHeader />
      <link rel="stylesheet" href="../../../assets/css/blog.css" />

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
                  <h2>Dashboard</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a
                      href="index.html"><i
                        className="icon-home"></i></a></li>
                    <li className="breadcrumb-item active">Dashboard
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 left-box">
                <div className="card">
                  <div className="header">
                    <h2>Liên hệ với chúng tôi</h2>

                  </div>
                  <div className="body">
                    <div className="card">

                      <div className="header">
                        <h2>Nhập thông tin liên hệ <small>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu*</small></h2>
                      </div>

                      {
                        (isLoaded) ? <div className="body"><button type="button"
                          className="btn btn-success btn-toastr col-lg-12"
                          data-position="bottom-right">{error}</button></div> : <></>
                      }

                      <div className="body">
                        <div className="comment-form">
                          <form className="row clearfix" onSubmit={postFormContact}>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" id='firstName' placeholder="Họ" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" id='lastName' placeholder="Tên" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" id='phone' placeholder="Số Điện Thoại" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" id='address' placeholder="Địa chỉ Email" />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <textarea rows={4} className="form-control no-resize" id='message' placeholder="Nội dung liên hệ"></textarea>
                              </div>
                              <button type="submit" className="btn btn-block btn-primary">Gửi</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 right-box">
                <div className="card">
                  <div className="header">
                    <h2>Bài viết phổ biến</h2>
                  </div>
                  <div className="body widget popular-post">
                    <div className="row">
                      <div className="col-lg-12">
                        {props.popularPosts.map((item, index) => {
                          return <div className="single_post" key={index}>
                            <a href={`/thanh-pham/${item.slug}/${item.id}`}><p className="m-b-0">{item.title}</p></a>
                            <span>{item.createdAt.substr(0, 10)}</span>
                            <div className="img-post">
                              <img src={item.image} alt="Awesome Image" />
                            </div>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="card">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4205949355232!2d106.78252777577669!3d10.855580057727176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752713f4affcb5%3A0xebcf061d8b5e444b!2zSFVURUNIIC0gVGjhu6cgxJDhu6ljIENhbXB1cw!5e0!3m2!1svi!2s!4v1685882556776!5m2!1svi!2s" width="100%" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>