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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export async function getServerSideProps(ctx: DocumentContext) {

  const res1 = await fetch(`${utils.baseURL}/api/admin/national/listNational`)
  const res3 = await fetch(`${utils.baseURL}/api/admin/product/list-product`)
  const nationals = await res1.json()
  const products = await res3.json()

  return {
    props: {
      nationals: nationals,
      products: products
    }
  };
}

const Create = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [listNational, setListNational] = useState(props.nationals)
  const [listProduct, setListProduct] = useState(props.products)
  const [news, setNews] = useState<any>(null)
  const Editor = dynamic(() => import("@/src/components/editor/editor"), { ssr: true });
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState("")
  const [productSelected, setProductSelected] = useState({ value: "", label: "" });
  let dataCkeditor = news?.content ?? "";
  const handleDataAbout = (dataTemplate) => {
    dataCkeditor = dataTemplate;
  };

  useEffect(() => {
    setIsLoaded(true)
    const newArray = listProduct.map(item => ({
      value: item.id,
      label: item.title
    }));
    setOptionsWarna(newArray)
  }, [])


  const postFormDataNews = async (event) => {
    event.preventDefault();
    try {
      var err = []
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


        await fetch("https://api.imgur.com/3/image", {
          method: "post",
          headers: {
            Authorization: "Client-ID cb0adfde641e643"
          },
          body: formdata
        }).then(data => data.json()).then(data => {
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
        productId: productSelected.value,
        data: dataChart
      }
      fetch("/api/admin/finish-product/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        setIsLoading(false)
        router.push("/admin/finish-product");
      })
    } catch (error) {
    }
  }

  const [optionsWarna, setOptionsWarna] = useState([
    { value: "biru", label: "Biru" },
    { value: "kuning", label: "Kuning" },
    { value: "hijau", label: "Hijau" },
    { value: "cokelat", label: "Cokelat" },
    { value: "merah", label: "Merah" }
  ]);

  const handleWarnaChange = async (selected, selectaction) => {
    const { action } = selectaction;
    // action.preventDefault();
    setProductSelected(selected);
  };

  const FormCreatePost = () => {

    return <form id="basic-form" onSubmit={postFormDataNews}>
      <div className="form-group">
        <label>Tên sản phẩm thành phẩm</label>
        <input type="text" id='title' className="form-control" required />
      </div>
      <div className="form-group">
        <label>Chế biến từ sản phầm: </label>
        <br />
        <Select
          required
          id="productId"
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={optionsWarna}
          onChange={handleWarnaChange}
        />
      </div>
      <div className="form-group">
        <label>Chọn hình ảnh cho sản phẩm thành phẩm</label>
        <div className="body" style={{ padding: 0 }}>
          <input type="file" id="img" className="dropify" />
        </div>
      </div>
      <div className="form-group">
        <label>Mô tả sản phẩm thành phẩm</label>
        <textarea id='description' className="form-control" rows={5} cols={30} ></textarea>
      </div>
      <div className="form-group">
        <label>Nội dung sản phẩm thành phẩm</label>
        <Editor data={dataCkeditor} onchangeData={handleDataAbout} id="dataCkeditor" />
      </div>

      <div className="form-group">
        <label>Tỉnh Thành / Quốc Gia</label>
        <br />
        {
          listNational.map((item, index) => {
            return <label className="fancy-radio" key={index}>
              <input type="radio" name="checkbox2" value={item.id} />
              <span><i></i>{item.name}</span>
            </label>
          })
        }
      </div>
      <div className="form-group">
        <label>Số liêu sản phẩm thành phẩm trong 5 năm</label>
        <div className="row">
          <div className="col">
            <label>2019</label>
            <input type="text" id='data1' className="form-control" />
          </div>
          <div className="col">
            <label>2020</label>
            <input type="text" id='data2' className="form-control" />
          </div>
          <div className="col">
            <label>2021</label>
            <input type="text" id='data3' className="form-control" />
          </div>
          <div className="col">
            <label>2022</label>
            <input type="text" id='data4' className="form-control" />
          </div>
          <div className="col">
            <label>2023</label>
            <input type="text" id='data5' className="form-control" />
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
      <link rel="stylesheet" href="../../assets/vendor/dropify/css/dropify.min.css" />
      <link rel="stylesheet" href="https://liruch.app/assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css" />
      <link rel="stylesheet" href="https://liruch.app/assets/vendor/multi-select/css/multi-select.css" />
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
            <HeaderTitle title="Thêm sản phẩm thành phẩm" />

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
      <script src="https://liruch.app/assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js" ></script>
      <script src="https://liruch.app/assets/vendor/multi-select/js/jquery.multi-select.js"></script>
      <script src="https://liruch.app/assets/js/pages/forms/advanced-form-elements.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>

      <Script strategy="lazyOnload" src="../../assets/js/pages/forms/dropify.js"></Script>
      <Script strategy="lazyOnload" src="../../assets/js/pages/forms/advanced-form-elements.js"></Script>
    </>
  )

}
export default dynamic(() => Promise.resolve(Create), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>