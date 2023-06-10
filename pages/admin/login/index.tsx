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
import authService from '@/src/services/authService/auth.service'
import router from 'next/router'
import utils from '@/src/utils/constant'
import { UserRole } from '@/src/constants/constaints'
import localStorageService from '@/src/services/localStorage.service/localStorage.service'
import { LoginDataModel } from '@/src/models/AdminDataResult'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [error, setError] = useState("")

  useEffect(() => {
    const isAdmin = authService.checkAuthAdmin();
    console.log(isAdmin)
    if (!isAdmin) {
      router.push("/admin/login");
    } 
    // else {
    //   router.push("/admin");
    // }
  }, [])

  const register = async (event) => {
    event.preventDefault();
    console.log(utils.checkEmptyString(event.target.email.value) == "", event.target.password.value)

    if (event.target.email.value == "" || event.target.email.value == "") {
      setError("Vui lòng không bỏ trống Tài khoản hoặc Mật khẩu")
      console.log(error)
      console.log("lòng không bỏ trống Tài khoản hoặc ")
      return
    } else {
      var data = JSON.stringify({
        "email": event.target.email.value,
        "name": "Admin",
        "password": event.target.password.value,
        "role": UserRole.admin
      });

      console.log(data)

      await fetch("/api/admin/auth/create-account", {
        method: 'POST',
        body: data,
        redirect: 'follow'
      }).then(response => {
        console.log("Create Account Success")
      }).catch(error => console.log('error', error));
    }
  }

  const login = async (event) => {
    event.preventDefault();
    console.log(utils.checkEmptyString(event.target.email.value) == "", event.target.password.value)

    if (event.target.email.value == "" || event.target.email.value == "") {
      setError("Vui lòng không bỏ trống Tài khoản hoặc Mật khẩu")
      console.log(error)
      console.log("lòng không bỏ trống Tài khoản hoặc ")

      return
    } else {

      var data = JSON.stringify({
        "email": event.target.email.value,
        "password": event.target.password.value
      });
      console.log(data)
      await fetch("/api/admin/auth/login", {
        method: 'POST',
        body: data,
        redirect: 'follow'
      }).then(response => {
        response.json()
          .then(result => {
            console.log("result", result)
            const userInfor: any = result;
            localStorageService.userInfor.set(new LoginDataModel(userInfor));
          })
      }).catch(error => console.log('error', error));
      window.location.href = "/admin"
    }

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

        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img src="https://www.wrraptheme.com/templates/lucid/html/assets/images/logo-white.svg" alt="Lucid" />
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Đăng nhập vào trang quản lý</p>
                </div>
                <div className="body">
                  <form className="form-auth-small" onSubmit={login}>
                    <div className="form-group">
                      <label htmlFor="email" className="control-label sr-only">Email</label>
                      <input type="email" className="form-control" id="email" name="email" placeholder="Tài Khoản" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="control-label sr-only">Password</label>
                      <input type="password" className="form-control" id="password" name="password" placeholder="Mật Khẩu" />
                    </div>
                    <div className="form-group clearfix">
                      <label className="fancy-checkbox element-left">
                        <input type="checkbox" />
                        <span>Lưu đăng nhập</span>
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Đăng Nhập</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default dynamic(() => Promise.resolve(Home), { ssr: false })

// <Script strategy="afterInteractive" src="assets/js/vendors.min.js" async></Script>
// <Script strategy="afterInteractive" src="assets/vendors/chartjs/Chart.min.js" async></Script>
// {/* <Script src="assets/js/pages/dashboard-default.js" async></Script> */}
// <Script strategy="lazyOnload" src="assets/js/app.min.js" async></Script>