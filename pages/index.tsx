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

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])
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

        <link rel="icon" href="/../../favicon.ico" type="image/x-icon" />

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
              <div className="col-lg-12">
                <div className="card">
                  <div className="header">
                    <h2>Lucid Activities</h2>
                  </div>
                  <div className="body">
                    <div className="timeline-item green"
                      date-is="20-04-2018 - Today">
                      <h5>Hello, 'Im a single div responsive
                        timeline without media Queries!</h5>
                      <span><a href="#">Elisse
                        Joson</a> San Francisco, CA</span>
                      <div className="msg">
                        <p>I'm speaking with myself, number one,
                          because I have a very good brain and
                          I've said a lot of things. I write
                          the best placeholder text, and I'm
                          the biggest developer on the web
                          card she has is the Lorem card.</p>
                        <a href="#"
                          className="m-r-20"><i
                            className="icon-heart"></i> Like</a>
                        <a role="button" data-toggle="collapse"
                          href="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"><i
                            className="icon-bubbles"></i>
                          Comment</a>
                        <div className="collapse animated fadeInDown m-t-10"
                          id="collapseExample">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea rows={2}
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."></textarea>
                              </div>
                              <button
                                className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="timeline-item blue"
                      date-is="19-04-2018 - Yesterday">
                      <h5>Oeehhh, that's awesome.. Me too!</h5>
                      <span><a href="#"
                        title="">Katherine Lumaad</a>
                        Oakland, CA</span>
                      <div className="msg">
                        <p>I'm speaking with myself, number one,
                          because I have a very good brain and
                          I've said a lot of things. on the
                          web by far... While that's mock-ups
                          and this is politics, are they
                          really so different? I think the
                          only card she has is the Lorem card.
                        </p>
                        <div className="timeline_img m-b-20">
                          <img className="w-25"
                            src="assets/images/blog/blog-page-4.jpg"
                            alt="Awesome Image" />
                          <img className="w-25"
                            src="assets/images/blog/blog-page-2.jpg"
                            alt="Awesome Image" />
                        </div>
                        <a href="#"
                          className="m-r-20"><i
                            className="icon-heart"></i> Like</a>
                        <a role="button" data-toggle="collapse"
                          href="#collapseExample1"
                          aria-expanded="false"
                          aria-controls="collapseExample1"><i
                            className="icon-bubbles"></i>
                          Comment</a>
                        <div className="collapse animated fadeInDown m-t-10"
                          id="collapseExample1">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea rows={2}
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."></textarea>
                              </div>
                              <button
                                className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item warning"
                      date-is="21-02-2018">
                      <h5>An Engineer Explains Why You Should
                        Always Order the Larger Pizza</h5>
                      <span><a href="#"
                        title="">Gary Camara</a> San
                        Francisco, CA</span>
                      <div className="msg">
                        <p>I'm speaking with myself, number one,
                          because I have a very good brain and
                          I've said a lot of things. I write
                          the best placeholder text, and I'm
                          the biggest developer on the web by
                          far... While that's mock-ups and
                          this is politics, is the Lorem card.
                        </p>
                        <a href="#"
                          className="m-r-20"><i
                            className="icon-heart"></i> Like</a>
                        <a role="button" data-toggle="collapse"
                          href="#collapseExample2"
                          aria-expanded="false"
                          aria-controls="collapseExample2"><i
                            className="icon-bubbles"></i>
                          Comment</a>
                        <div className="collapse animated fadeInDown m-t-10"
                          id="collapseExample2">
                          <div className="well">
                            <form>
                              <div className="form-group">
                                <textarea rows={2}
                                  className="form-control no-resize"
                                  placeholder="Enter here for tweet..."></textarea>
                              </div>
                              <button
                                className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>
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

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>