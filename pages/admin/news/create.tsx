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
import HeaderTitle from '@/src/components/HeaderTitle'

const inter = Inter({ subsets: ['latin'] })

const CreateNews = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [news, setNews] = useState<any>(null)
  const Editor = dynamic(() => import("@/src/components/editor/editor"), { ssr: true });
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState("")
  let dataCkeditor = news?.content ?? "";
  const handleDataAbout = (dataTemplate) => {
    dataCkeditor = dataTemplate;
    console.log(dataTemplate)
  };

  useEffect(() => {
    setIsLoaded(true)
  }, [])


  const postFormDataNews = async (event) => {
    event.preventDefault();
    try {
      var err = []
      console.log("Dopngne")

      var formdata = new FormData();
      formdata.append(
        "image",
        event.target.img.files[0]
      );

      formdata.append("name", event.target.name.value);
      formdata.append("title", event.target.name.value);

      var linkImage = ""
      setIsLoading(true)
      if (event.target.img.files[0]?.name) {

        console.log("post image")

        await fetch("https://api.imgur.com/3/image", {
          method: "post",
          headers: {
            Authorization: "Client-ID cb0adfde641e643"
          },
          body: formdata
        }).then(data => data.json()).then(data => {
          console.log(data.data.link)
          linkImage = data.data.link
        })
      } else {

      }
      let user = authService.getUserInfor()

      var data = {
        title: event.target.title.value,
        description: event.target.description.value,
        authorId: user.id,
        content: dataCkeditor,
        image: linkImage,
        published: event.target.published.checked
      }
      console.log(data)
      fetch("/api/admin/news/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        console.log(res)
        setIsLoading(false)
        router.push("/admin/news");
      })
    } catch (error) {
    }
  }

  const FormCreatePost = () => {

    return <form id="basic-form" onSubmit={postFormDataNews}>
      <div className="form-group">
        <label>Tiêu đề bài viết</label>
        <input type="text" id='title' className="form-control" required />
      </div>
      <div className="form-group">
        <label>Chọn hình ảnh cho bài viết</label>
        <div className="body" style={{ padding: 0 }}>
          <input type="file" id="img" className="dropify" />
        </div>
      </div>
      <div className="form-group">
        <label>Mô tả bài viết</label>
        <textarea id='description' className="form-control" rows={5} cols={30} required></textarea>
      </div>

      <div className="form-group">
        <label>Nội dung bài viết</label>
        <Editor data={dataCkeditor} onchangeData={handleDataAbout} id="dataCkeditor" />
      </div>
      <div className="form-group">
        <div className="fancy-checkbox">
          <label><input type="checkbox" id="published" /><span>Xuất bản</span></label>
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
        <title>Tạo bài viết</title>
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
      <link rel="stylesheet" href="../../assets/vendor/dropify/css/dropify.min.css" />

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
            <HeaderTitle title="Thêm bài viết tin tức" />
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card">
                  <div className="header">
                    <h2>Form</h2>
                  </div>
                  <div className="body">
                    {FormCreatePost()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Javascript --> */}
      <ScriptHeader />
      <Script strategy="lazyOnload" src="../../assets/vendor/dropify/js/dropify.min.js"></Script>
      <Script strategy="lazyOnload" src="../../assets/js/pages/forms/dropify.js"></Script>
    </>
  )

}
export default dynamic(() => Promise.resolve(CreateNews), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>