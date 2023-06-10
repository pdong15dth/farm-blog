import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/src/components/Header'
import SideNav from '@/src/components/SideNav'
import Script from 'next/script'
import { url } from 'inspector'
import CssHeader from '@/src/components/CssHeader'
import ScriptHeader from '@/src/components/ScriptHeader'
import { DocumentContext } from 'next/document'
import utils from '@/src/utils/constant'
import Footer from '@/src/components/Footer'

export async function getServerSideProps(ctx: DocumentContext) {
  console.log(ctx.query.tinh_tp)
  const resNational = await fetch(`${utils.baseURL}/api/client/national`)
  const nationals = await resNational.json()
  const res = await fetch(`${utils.baseURL}/api/client/product/list-product?national=${ctx.query.tinh_tp}`)
  const products = await res.json()

  const resNews = await fetch(`${utils.baseURL}/api/client/news/list-news-home`)
  const news = await resNews.json()

  const resFinistProducts = await fetch(`${utils.baseURL}/api/client/finish-product/list-finish-product`)
  const finishProducts = await resFinistProducts.json()

  return {
    props: {
      products,
      nationals,
      news,
      finishProducts
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
        <title>Trang chủ</title>
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
            <div className="row clearfix">
              <div className="col-lg-8">
                <div className="card single_post">
                  <div className="body">
                    <div className="img-post">
                      <img className="d-block img-fluid" src={props.news[0].image} alt="First slide" />
                    </div>
                    <h3><a href={`/tin-tuc/${props.news[0].slug}/${props.news[0].id}`}>{props.news[0].title}</a></h3>
                    <p>{props.news[0].description}</p>
                  </div>
                  <div className="footer">
                    <div className="actions">
                      <a href={`/tin-tuc/${props.news[0].slug}/${props.news[0].id}`} className="btn btn-outline-secondary">Xem thêm</a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Nông Sản</h2>
                  </div>
                  <div className="body row clearfix">
                    {
                      props.products.map((item, index) => {
                        return <div key={index} className="col-lg-3">
                          <div className="card">
                            <a href={`/nong-san/${item.slug}/${item.id}`}>
                              <div className="body text-center">
                                <div className="chart easy-pie-chart-1" data-percent="75"> <span>
                                  <img src={item.image} alt="user" className="rounded-circle" /></span> </div>
                                <h6>{item.title}</h6>
                              </div>
                            </a>
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Thành Phẩm</h2>
                  </div>
                  <div className="body">
                    <ul className="comment-reply list-unstyled">
                      {
                        props.finishProducts.map((item, index) => {
                          return <li key={index} className="row clearfix">
                            <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src={item.image} alt="Awesome Image" /></div>
                            <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                              <a href={`/thanh-pham/${item.slug}/${item.id}`}><h5 className="m-b-0">{item.title} - {item.national.name}</h5></a>
                              <p>Sản lượng:
                                {

                                  JSON.parse(item.data).map((obj, index2) => {
                                    const key = Object.keys(obj)[0];
                                    const value = obj[key];
                                    return <Fragment key={index2}> {key}: <strong>{value}</strong> (Tấn),</Fragment>;
                                  })
                                }
                              </p>
                              <ul className="list-inline">
                                <li><a href={`/thanh-pham/${item.slug}/${item.id}`}>Xem chi tiết</a></li>
                              </ul>
                            </div>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                </div>
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
              <div className="col-lg-4 right-box">
                {
                  props.news.map((item, index) => {
                    if (item.id != props.news[0].id) {
                      return <div key={index} className="card single_post">
                        <div className="body">
                          <div className="img-post">
                            <img className="d-block img-fluid" src={item.image} alt="First slide" />
                          </div>
                          <h3><a href={`/tin-tuc/${item.slug}/${item.id}`}>{item.title}</a></h3>
                        </div>
                        <div className="footer">
                          <div className="actions">
                            <a href={`/tin-tuc/${item.slug}/${item.id}`} className="btn btn-outline-secondary">Xem thêm</a>
                          </div>
                        </div>
                      </div>
                    }
                  })
                }
                <div className="card">
                  <div className="header">
                    <h2>Tỉnh Thành Phố / Quốc Gia</h2>
                  </div>
                  <div className="body widget">
                    <ul className="list-unstyled categories-clouds m-b-0">
                      <li><a href={`/nong-san`}>Tất cả</a></li>
                      {
                        props.nationals.map((item, index) => {
                          return <li style={{ padding: 4 }} key={index}><a href={`/nong-san?tinh_tp=${item.slug}`}>{item.name}</a></li>
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