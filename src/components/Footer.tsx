export default function Footer() {
  return <div className="container-full">
    <div className="row clearfix">
      <footer className="col-lg-12 bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Nhận thông báo các bài viết mới nhất qua Email</strong>
                  </p>
                </div>
                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input type="email" id="form5Example29" className="form-control" />
                    <label className="form-label" htmlFor="form5Example29">Địa chỉ Email</label>
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Đăng ký
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div className="text-center p-3" >
          © 2023 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  </div>
}