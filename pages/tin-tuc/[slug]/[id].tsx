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



export async function getServerSideProps(ctx: DocumentContext) {

  const res = await fetch(`${utils.baseURL}/api/client/news/getById?id=${ctx.query.id}`)
  const newsDetail = await res.json()
  console.log(ctx.query)
  return {
    props: {
      newsDetail,
    },
  }
}

const Index = (props) => {
  console.log(props.newsDetail)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const RenderNewsList = () => {

    return props.posts.map((item, index) => {

      return <div className="col-lg-6" key={index}>
        <div className="card single_post">
          <div className="body">
            <div className="img-post">
              <img className="d-block img-fluid" src={item.image} alt="First slide" />
            </div>
            <h3><a href="blog-details.html">{item.title}</a></h3>
            <p>{item.description}</p>
          </div>
          <div className="footer">
            <div className="actions">
              <a href="#" className="btn btn-outline-secondary">Xem thêm</a>
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

        <AdminSideNav />

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
                    <li className="breadcrumb-item active">{props.newsDetail.title}</li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 left-box">
                <div className="card single_post">
                  <div className="body">
                    <div className="img-post">
                      <img className="d-block img-fluid" src={props.newsDetail.image} alt="First slide" />
                    </div>
                    <h3><a href="blog-details.html">{props.newsDetail.title}</a></h3>
                    <p>{props.newsDetail.description}</p>
                    <br />
                    {parse(`${props.newsDetail.content}`)}
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Comments 3</h2>
                  </div>
                  <div className="body">
                    <ul className="comment-reply list-unstyled">
                      <li className="row clearfix">
                        <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="../../assets/images/sm/avatar2.jpg" alt="Awesome Image" /></div>
                        <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                          <h5 className="m-b-0">Gigi Hadid </h5>
                          <p>Why are there so many tutorials on how to decouple WordPress? how fast and easy it is to get it running (and keep it running!) and its massive ecosystem. </p>
                          <ul className="list-inline">
                            <li><a href="#">Mar 09 2018</a></li>
                            <li><a href="#">Reply</a></li>
                          </ul>
                        </div>
                      </li>
                      <li className="row clearfix">
                        <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="../../assets/images/sm/avatar3.jpg" alt="Awesome Image" /></div>
                        <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                          <h5 className="m-b-0">Christian Louboutin</h5>
                          <p>Great tutorial but few issues with it? If i try open post i get following errors. Please can you help me?</p>
                          <ul className="list-inline">
                            <li><a href="#">Mar 12 2018</a></li>
                            <li><a href="#">Reply</a></li>
                          </ul>
                        </div>
                      </li>
                      <li className="row clearfix">
                        <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="../../assets/images/sm/avatar4.jpg" alt="Awesome Image" /></div>
                        <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                          <h5 className="m-b-0">Kendall Jenner</h5>
                          <p>Very nice and informative article. In all the years I've done small and side-projects as a freelancer, I've ran into a few problems here and there.</p>
                          <ul className="list-inline">
                            <li><a href="#">Mar 20 2018</a></li>
                            <li><a href="#">Reply</a></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Leave a reply <small>Your email address will not be published. Required fields are marked*</small></h2>
                  </div>
                  <div className="body">
                    <div className="comment-form">
                      <form className="row clearfix">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Name" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email Address" />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <textarea rows={4} className="form-control no-resize" placeholder="Please type what you want..." ></textarea>
                          </div>
                          <button type="submit" className="btn btn-block btn-primary">SUBMIT</button>
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
                    <h2>Categories Clouds</h2>
                  </div>
                  <div className="body widget">
                    <ul className="list-unstyled categories-clouds m-b-0">
                      <li><a href="#">eCommerce</a></li>
                      <li><a href="#">Microsoft Technologies</a></li>
                      <li><a href="#">Creative UX</a></li>
                      <li><a href="#">Wordpress</a></li>
                      <li><a href="#">Angular JS</a></li>
                      <li><a href="#">Enterprise Mobility</a></li>
                      <li><a href="#">Website Design</a></li>
                      <li><a href="#">HTML5</a></li>
                      <li><a href="#">Infographics</a></li>
                      <li><a href="#">Wordpress Development</a></li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Popular Posts</h2>
                  </div>
                  <div className="body widget popular-post">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="single_post">
                          <p className="m-b-0">Apple Introduces Search Ads Basic</p>
                          <span>jun 22, 2018</span>
                          <div className="img-post">
                            <img src="../../assets/images/blog/blog-page-2.jpg" alt="Awesome Image" />
                          </div>
                        </div>
                        <div className="single_post">
                          <p className="m-b-0">new rules, more cars, more races</p>
                          <span>jun 8, 2018</span>
                          <div className="img-post">
                            <img src="../../assets/images/blog/blog-page-3.jpg" alt="Awesome Image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Instagram Post</h2>
                  </div>
                  <div className="body widget">
                    <ul className="list-unstyled instagram-plugin m-b-0">
                      <li><a href="#"><img src="../../assets/images/blog/05-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/06-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/07-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/08-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/09-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/10-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/11-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/12-img.jpg" alt="image description" /></a></li>
                      <li><a href="#"><img src="../../assets/images/blog/13-img.jpg" alt="image description" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>Email Newsletter <small>Get our products/news earlier than others, let’s get in touch.</small></h2>
                  </div>
                  <div className="body widget newsletter">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter Email" />
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
export default dynamic(() => Promise.resolve(Index), { ssr: false })
