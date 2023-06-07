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
import { DocumentContext } from 'next/document'
import utils from '@/src/utils/constant'

export async function getServerSideProps(ctx: DocumentContext) {

  const res1 = await fetch(`${utils.baseURL}/api/admin/national/listNational`)
  const nationals = await res1.json()

  return {
    props: {
      nationals: nationals,
    }
  };
}

const CreateNews = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [listNational, setListNational] = useState(props.nationals)
  const [listContries, setListContries] = useState(props.countries)
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


      let nationalId = []
      for (let index = 0; index < event.target.checkbox2.length; index++) {
        const element = event.target.checkbox2[index];
        if (element.checked) {
          nationalId.push(parseInt(element.value))
        }
      }
      let dataChart = JSON.stringify([
        {
          "2019": event.target.data1.value
        },
        {
          "2020": event.target.data2.value
        },
        {
          "2021": event.target.data3.value
        },
        {
          "2022": event.target.data4.value
        },
        {
          "2023": event.target.data5.value
        },
      ])

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
        published: event.target.published.checked,
        nationalId: parseInt(event.target.checkbox2.value),
        data: dataChart
      }
      console.log("debug 0", data)
      fetch("/api/admin/product/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        console.log(res)
        setIsLoading(false)
        router.push("/admin/product");
      })
    } catch (error) {
      console.log(error)
    }
  }

  const FormCreatePost = () => {

    return <form id="basic-form" onSubmit={postFormDataNews}>
      <div className="form-group">
        <label>Tên Nông Sản</label>
        <input type="text" id='title' className="form-control" required />
      </div>
      <div className="form-group">
        <label>Chọn hình ảnh cho Nông Sản</label>
        <div className="body" style={{ padding: 0 }}>
          <input type="file" id="img" className="dropify" />
        </div>
      </div>
      <div className="form-group">
        <label>Mô tả Nông Sản</label>
        <textarea id='description' className="form-control" rows={5} cols={30} ></textarea>
      </div>
      <div className="form-group">
        <label>Nội dung Nông Sản</label>
        <Editor data={dataCkeditor} onchangeData={handleDataAbout} id="dataCkeditor" />
      </div>
      <div className="form-group">
        <label>Tỉnh Thành / Quốc Gia</label>
        <br />
        {
          listNational.map((item, index) => {
            return <label className="fancy-radio" key={index}>
              <input type="radio" name="checkbox2" value={item.id} required defaultChecked />
              <span><i></i>{item.name}</span>
            </label>
          })
        }
      </div>
      <div className="form-group">
        <label>Số liêu nông sản trong 5 năm</label>
        <div className="row">
          <div className="col">
            <label>2019</label>
            <input type="text" id='data1' className="form-control" required />
          </div>
          <div className="col">
            <label>2020</label>
            <input type="text" id='data2' className="form-control" required />
          </div>
          <div className="col">
            <label>2021</label>
            <input type="text" id='data3' className="form-control" required />
          </div>
          <div className="col">
            <label>2022</label>
            <input type="text" id='data4' className="form-control" required />
          </div>
          <div className="col">
            <label>2023</label>
            <input type="text" id='data5' className="form-control" required />
          </div>

        </div>
      </div>
      <div className="form-group">
        <div className="fancy-checkbox">
          <label><input type="checkbox" id="published" /><span>Xuất bản</span></label>
        </div>
      </div>
      <br />
      {/* {isLoading ?
        <button type="submit" disabled className="btn btn-primary col-md-12">Đang lưu</button>
        :
        <button type="submit" className="btn btn-primary col-md-12">Lưu</button>} */}
      <button type="submit" className="btn btn-primary col-md-12">Lưu</button>
    </form>
  }
  return (
    <>
      <Head>
        <title>:: Admin :: Nông Sản</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Lucid Bootstrap 4.1.1 Admin Template" />
        <meta name="author" content="WrapTheme, design by: ThemeMakker.com" />

        <link rel="icon" href="../../favicon.ico" type="image/x-icon" />


      </Head>

      {/* <!-- VENDOR CSS --> */}
      <link rel="stylesheet" href="../../assets/vendor/dropify/css/dropify.min.css" />
      <link rel="stylesheet" href="../../assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css" />
      <link rel="stylesheet" href="../../assets/vendor/parsleyjs/css/parsley.css" />
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
            <HeaderTitle title="Thêm nông sản" />

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
      {/* <!-- Multi Select Plugin Js --> */}
      <Script strategy="lazyOnload" src="../../assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js"></Script>
      <Script strategy="lazyOnload" src="../../assets/vendor/multi-select/js/jquery.multi-select.js"></Script>
      <Script strategy="lazyOnload" src="../../assets/js/pages/forms/dropify.js"></Script>
      <Script strategy="lazyOnload" src="../../assets/js/pages/forms/advanced-form-elements.js"></Script>
    </>
  )

}
export default dynamic(() => Promise.resolve(CreateNews), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>