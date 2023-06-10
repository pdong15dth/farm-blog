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
import parse from 'html-react-parser';
import moment from 'moment'
import Footer from '@/src/components/Footer'



export async function getServerSideProps(ctx: DocumentContext) {

  const res = await fetch(`${utils.baseURL}/api/client/news/getById?id=${ctx.query.id}`)
  const res2 = await fetch(`${utils.baseURL}/api/client/news/popular-posts`)
  const newsDetail = await res.json()
  const popularPosts = await res2.json()

  return {
    props: {
      newsDetail,
      popularPosts,
      id: ctx.query.id,
    },
  }
}

const Index = (props) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [newsDetail, setNewsDetail] = useState(props.newsDetail)
  const [error, setError] = useState("")

  const postFormComment = async (event) => {
    console.log("comment")
    event.preventDefault();
    try {
      var err = []
      setIsLoaded(false)

      var data = {
        fullName: event.target.fullName.value,
        email: event.target.email.value,
        content: event.target.content.value,
        postId: props.id
      }
      console.log(data)
      fetch("/api/client/comment/news-create", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(async res => {
        setError("Bình luận thành công")
        if (res.code == 401) {
          setError(res.message)
          return
        }
        const resNews = await fetch(`${utils.baseURL}/api/client/news/getById?id=${props.id}`)
        const newsDetail = await resNews.json()
        setNewsDetail(newsDetail)
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
      <link rel="stylesheet" href="../../../assets/css/blog.css" />
      <script dangerouslySetInnerHTML={{
        __html: `<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=734283891822484&autoLogAppEvents=1" nonce="F1RuyQrS"></script>
`}}></script>
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
                  <h2>Tin tức</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a
                      href="index.html"><i
                        className="icon-home"></i></a></li>
                    <li className="breadcrumb-item active">Tin tức</li>
                    <li className="breadcrumb-item active">{newsDetail.title}</li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 left-box">
                <div className="card single_post">
                  <div className="body client">
                    <div className="img-post">
                      <img className="d-block img-fluid" src={newsDetail.image} alt="First slide" />
                    </div>
                    <h3><a href="blog-details.html">{newsDetail.title}</a></h3>
                    <p>{newsDetail.description}</p>
                    <br />
                    {parse(`${newsDetail.content}`)}
                  </div>
                </div>

                <div className="card">
                  <div className="body">
                    <ul className="nav nav-tabs-new2">
                      <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Home-new2">Bình Luận ({newsDetail.comments.length})</a></li>
                    </ul>
                    <div className="tab-content" id='Home-new2'>
                      <div className="tab-pane animated flipInX active"
                        id="Home-new2">
                        <ul className="comment-reply list-unstyled">
                          {
                            newsDetail.comments.map((item, index) => {
                              return <li key={index} className="row clearfix">
                                <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="Awesome Image" /></div>
                                <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                                  <h5 className="m-b-0">{item.fullName}</h5>
                                  <p>{item.content}</p>
                                  <ul className="list-inline">
                                    <li><a href="#">{moment(item.createdAt).format('MMMM Do YYYY')}</a></li>
                                  </ul>
                                </div>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Để lại bình luận <small>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu*</small></h2>
                  </div>
                  {
                    (isLoaded) ? <div className="body"><button type="button"
                      className="btn btn-success btn-toastr col-lg-12"
                      data-position="bottom-right">{error}</button></div> : <></>
                  }
                  <div className="body">
                    <div className="comment-form">
                      <form className="row clearfix" onSubmit={postFormComment}>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" id='fullName' required placeholder="Họ và Tên" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" id='email' required placeholder="Địa chỉ Email" />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <textarea rows={4} className="form-control no-resize" id='content' required placeholder="Vui lòng nhập nội dung bạn muốn..." ></textarea>
                          </div>
                          <button type="submit" className="btn btn-block btn-primary">Gửi</button>
                        </div>
                      </form>
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
                    <h2>Bài viết phổ biến</h2>
                  </div>
                  <div className="body widget popular-post">
                    <div className="row">
                      <div className="col-lg-12">
                        {props.popularPosts.map((item, index) => {
                          return <div className="single_post" key={index}>
                            <p className="m-b-0">{item.title}</p>
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
          </div >
          <Footer />
        </div>
      </div>
      {/* <!-- Javascript --> */}
      < ScriptHeader />

    </>
  )

}
export default dynamic(() => Promise.resolve(Index), { ssr: false })
