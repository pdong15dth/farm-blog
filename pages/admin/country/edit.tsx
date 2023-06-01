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
import authService from '@/src/services/authService/auth.service'
import router from 'next/router'
import utils from '@/src/utils/constant'
import { DocumentContext } from 'next/document'
import HeaderTitle from '@/src/components/HeaderTitle'

export async function getServerSideProps(ctx: DocumentContext) {
  console.log(ctx.query.id)
  const res = await fetch(`${utils.baseURL}/api/admin/country/getById?id=${ctx.query.id}`)
  const country = await res.json()

  return {
    props: {
      country: country
    }
  };
}

const EditCountry = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [news, setNews] = useState<any>(null)
  const [slugTitle, setSlugTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  let dataCkeditor = news?.content ?? "";
  const handleDataAbout = (dataTemplate) => {
    dataCkeditor = dataTemplate;
    console.log(dataTemplate)
  };

  useEffect(() => {
    setIsLoaded(true)
    setSlugTitle(utils.ChangeToSlug(props.country.countryName))
  }, [])


  const postFormDataNews = async (event) => {
    event.preventDefault();
    try {
      var err = []
      console.log("Dopngne")

      setIsLoading(true)
      var data = {
        id: props.country.id,
        countryName: event.target.countryName.value,
      }
      console.log(data)
      fetch("/api/admin/country/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        console.log(res.message)
        setIsLoading(false)
        setError("")
        if (res.code == 401) {
          setError(res.message)
          return
        }
        router.push("/admin/country");
      }).catch(error => {
        console.log("res.message 2")
        console.log(error.message)
      })
    } catch (error) {

      console.log("error")
    }
  }

  const FormEditCountry = () => {

    return <form id="basic-form" onSubmit={postFormDataNews}>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Tiêu đề bài viết</label>
            <input
              onChange={(event) => {
                console.log(event.target.value)

                setSlugTitle(utils.ChangeToSlug(event.target.value))
              }} type="text" id='countryName' defaultValue={props.country.countryName} className="form-control" required />
          </div>

          {
            error != "" ?
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
              : <></>
          }
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Slug</label>
            <input type="text" disabled id='slug' defaultValue={slugTitle} className="form-control" />
          </div>
        </div>
      </div>

      <br />
      {isLoading ?
        <button type="submit" disabled className="btn btn-primary col-md-12">Đang lưu</button>
        :
        <button type="submit" className="btn btn-primary col-md-12">Lưu</button>}
    </form>
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
            <HeaderTitle title="Chỉnh sửa Tỉnh / TP" />
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card">
                  <div className="header">
                    <h2>Form</h2>
                  </div>
                  <div className="body">
                    {FormEditCountry()}
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
export default dynamic(() => Promise.resolve(EditCountry), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>