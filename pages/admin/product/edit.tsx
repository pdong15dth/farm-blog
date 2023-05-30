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
import { DocumentContext } from 'next/document'
import { Post, Product } from '@prisma/client'
import HeaderTitle from '@/src/components/HeaderTitle'
import utils from '@/src/utils/constant'
import { VulnChart } from './VulnChart'

export async function getServerSideProps(ctx: DocumentContext) {
  const res1 = await fetch(`${utils.baseURL}/api/admin/national/listNational`)

  const res2 = await fetch(`${utils.baseURL}/api/admin/country/listCountry`)
  const res3 = await fetch(`${utils.baseURL}/api/admin/product/getById?id=${ctx.query.id}`)

  const nationals = await res1.json()
  const countries = await res2.json()
  const news = await res3.json()
  let selectContries = []
  let selectNationals = []
  let dataChart = []

  if (news?.data != null) {
    JSON.parse(news?.data).forEach(element => {
      dataChart.push(element)
    });
  }

  if (news?.country != null) {
    JSON.parse(news?.country).forEach(element => {
      selectContries.push(element)
    });
  }

  if (news?.national != null) {
    JSON.parse(news?.national).forEach(element => {
      selectNationals.push(element)
    });
  }

  return {
    props: {
      news: news,
      listNational: nationals,
      listContries: countries,
      selectContries: selectContries,
      selectNationals: selectNationals,
      dataChart: dataChart
    }
  };
}

const EditNews = (props) => {

  const [news, setNews] = useState<Product>(props.news)
  const [listNational, setlistNational] = useState(props.listNational)
  const [listContries, setlistContries] = useState(props.listContries)
  const [isLoading, setIsLoading] = useState(false)
  const [loadPageState, setLoadPageState] = useState(false)
  const Editor = dynamic(() => import("@/src/components/editor/editor"), { ssr: true });



  let dataCkeditor = news?.content ?? "";
  const handleDataAbout = (dataTemplate) => {
    dataCkeditor = dataTemplate;
    console.log(dataTemplate)
  };

  useEffect(() => {
    setLoadPageState(true)
    const isAdmin = authService.checkAuthAdmin();
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [])


  const postFormDataNews = async (event) => {
    event.preventDefault();
    try {
      var err = []
      let contriesId = []
      for (let index = 0; index < event.target.checkbox1.length; index++) {
        const element = event.target.checkbox1[index];
        if (element.checked) {
          contriesId.push(parseInt(element.value))
        }
      }

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
        linkImage = news.image;
      }
      let user = authService.getUserInfor()

      var data = {
        id: news.id,
        title: event.target.title.value,
        description: event.target.description.value,
        authorId: user.id,
        content: dataCkeditor,
        image: linkImage,
        published: event.target.published.checked,
        countries: JSON.stringify(contriesId),
        national: JSON.stringify(nationalId),
        data: dataChart
      }
      console.log(data)
      fetch("/api/admin/product/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        console.log(res)
        setIsLoading(false)
        //router.push("/admin/product");
      })
    } catch (error) {
    }
  }
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (event) => {
    event.preventDefault();
    const searchString = event.target.value;
    setSearchString(searchString);

    const filteredArray = props.listNational.filter((item) =>
      typeof item.nationalName === "string" &&
      item.nationalName.toLowerCase().includes(searchString.toLowerCase())
    );
    setlistNational(filteredArray);
  };

  const FormCreatePost = () => {

    return <form id="basic-form" onSubmit={postFormDataNews}>
      <div className="form-group">
        <label>Tên Nông Sản</label>
        <input type="text" defaultValue={news?.title} id='title' className="form-control" required />
      </div>
      <div className="form-group">
        <label>Chọn hình ảnh cho Nông Sản</label>
        <div className="body" style={{ padding: 0 }}>
          <input type="file" id="img" data-default-file={news?.image} className="dropify" />
        </div>
      </div>
      <div className="form-group">
        <label>Mô tả Nông Sản</label>
        <textarea id='description' defaultValue={news?.description} className="form-control" rows={5} cols={30} required></textarea>
      </div>

      <div className="form-group">
        <label>Nội dung Nông Sản</label>
        <Editor data={dataCkeditor} onchangeData={handleDataAbout} id="dataCkeditor" />
      </div>

      <div className="form-group">
        <label>Tỉnh / TP</label>
        <br />
        {
          listContries?.map((item, index) => {
            return <label key={index} className="fancy-checkbox">
              <input type="checkbox" value={item.id} defaultChecked={props?.selectContries.indexOf(item.id) != -1} name="checkbox1" data-parsley-errors-container="#error-checkbox" />
              <span>{item.countryName}</span>
            </label>
          })
        }
        <p id="error-checkbox"></p>
      </div>
      <div className="form-group">
        <label>Quốc Gia</label>
        <br />
        {
          listNational?.map((item, index) => {
            return <label key={index} className="fancy-checkbox">
              <input type="checkbox" defaultValue={item.id} defaultChecked={props?.selectNationals.includes(item.id)} name="checkbox2" data-parsley-errors-container="#error-checkbox" />
              <span>{item.nationalName}</span>
            </label>
          })
        }
        <p id="error-checkbox"></p>
      </div>
      <div className="form-group">
        <label>Số liêu nông sản trong 5 năm</label>
        <div className="row">
          {
            props.dataChart.map((item, index) => {
              return <div key={index} className="col">
                <label>{Object.entries(item)[0][0].toString()}</label>
                <input type="text" id={`data${index + 1}`} defaultValue={Object.entries(item)[0][1].toString()} className="form-control" required />
              </div>
            })
          }
        </div>
      </div>
      <div className="form-group">
        <div className="fancy-checkbox">
          <label><input type="checkbox" id="published" defaultChecked={news?.published} /><span>Xuất bản</span></label>
        </div>
      </div>
      <br />
      {
        isLoading ?
          <button type="submit" disabled className="btn btn-primary col-md-12">Đang lưu</button>
          :
          <button type="submit" className="btn btn-primary col-md-12">Lưu</button>
      }
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

        <link rel="icon" href="favicon.ico" type="image/x-icon" />

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
            <HeaderTitle title="Chỉnh sửa Nông Sản" />
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

              <div className="card">
                <div className="header">
                  <h2>Chart</h2>
                </div>
                <div className="body">
                  <VulnChart />
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
export default dynamic(() => Promise.resolve(EditNews), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>