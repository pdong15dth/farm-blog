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
import utils from '@/src/utils/constant'
import authService from '@/src/services/authService/auth.service'
import router from 'next/router'
import AdminSideNav from '@/src/components/admin/AdminSideNav'
import HeaderTitle from '@/src/components/HeaderTitle'


export async function getServerSideProps() {
  const res = await fetch(`${utils.baseURL}/api/admin/national/listNational`)

  const nationals = await res.json()
  return {
    props: {
      nationals,
    },
  }
}
const IndexNational = ({ nationals }) => {
  const [nationalsData, setnationalsData] = useState(nationals)
  const [loadPageState, setLoadPageState] = useState(false)
  const [slugTitle, setSlugTitle] = useState("")
  const [error, setError] = useState("")

  const reloadCountry = async () => {
    const res = await fetch(`/api/admin/national/listNational`)
    const nationals = await res.json()
    setnationalsData(nationals)
  }

  useEffect(() => {
    setLoadPageState(true)
    const isAdmin = authService.checkAuthAdmin();
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [])

  const removeItem = (id) => {
    console.log(id)
    var body = { id }
    fetch(`${utils.baseURL}/api/admin/national/delete`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => response.json()).then(result => {
      console.log(result)
      const newList = nationalsData.filter((item) => item.id !== id);
      setnationalsData(newList);
    }).catch(error => console.log('error', error));
  }

  const ListNews = () => {
    if (nationalsData == null) {
      console.log("news null roi dmm")
      return
    }

    return nationalsData?.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.id}</span>
          </td>
          <td>
            <span className="phone"><i className="zmdi zmdi-phone m-r-10"></i>{item.name}</span>
          </td>
          <td>
            <address><i className="zmdi zmdi-pin"></i>{item.slug}</address>
          </td>
          <td>
            <a href={`/admin/national/edit?id=${item?.id}`} type="button" className="btn btn-info" title="Edit"><i className="fa fa-edit" ></i></a>
            &nbsp;
            <button type="button" data-type="confirm" className="btn btn-danger js-sweetalert" title="Delete" onClick={() => removeItem(item.id)}><i className="fa fa-trash-o"></i></button>
          </td>
        </tr>
      )
    })
  }
  const [isLoading, setIsLoading] = useState(false)

  const postFormDataNational = async (event) => {
    event.preventDefault();
    try {
      var err = []
      console.log("Dopngne")

      setIsLoading(true)
      let user = authService.getUserInfor()

      var data = {
        name: event.target.name.value,
        isCountry: event.target.isCountry.value == "1" ? true : false
      }
      console.log(data)
      fetch("/api/admin/national/upsert", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res => {
        console.log(res)
        setIsLoading(false)
        if (res.code == 401) {
          setError(event.target.nationalName.value + " - " + res.message)
          return
        }
        reloadCountry()
        event.target.reset();
        setSlugTitle("")
      })
    } catch (error) {
    }
  }
  const FormCreateNational = () => {

    return <form id="basic-form" onSubmit={postFormDataNational}>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Tên Tỉnh Thành / Quốc Gia</label>
            <input onChange={(event) => {
              console.log(event.target.value)

              setSlugTitle(utils.ChangeToSlug(event.target.value))
            }} type="text" id='name' className="form-control" required />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Slug</label>
            <input type="text" disabled id='slug' value={slugTitle} className="form-control" />
          </div>
        </div>
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
      <div className="form-group">
        <label>Khu vực</label>
        <br />
        <label className="fancy-radio">
          <input type="radio" name="isCountry" value="1" required defaultChecked />
          <span><i></i>Trong nước</span>
        </label>
        <label className="fancy-radio">
          <input type="radio" name="isCountry" value="0" />
          <span><i></i>Quốc tế</span>
        </label>
        <p id="error-radio"></p>
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

            <HeaderTitle title="Thêm Quốc gia" />

            <div className="row clearfix">
              <div className="col-lg-12">

                <div className="card">
                  <div className="header">
                    <h2>Form</h2>
                  </div>
                  <div className="body">
                    {FormCreateNational()}
                  </div>

                  <div className="body">
                    <div className="table-responsive">
                      <table className="table table-hover m-b-0 c_list">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Slug</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ListNews()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* <!-- Javascript --> */}
      <ScriptHeader />
    </>
  )

}
export default dynamic(() => Promise.resolve(IndexNational), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>