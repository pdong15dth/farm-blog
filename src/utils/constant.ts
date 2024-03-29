class Utils {
  constructor() { }
  baseURL: string = "https://farm-blog-six.vercel.app";
  amoutList = [
    {
      id: 1,
      stringAmount: "10,000,000"
    },
    {
      id: 3,
      stringAmount: "30,000,000"
    },

    {
      id: 5,
      stringAmount: "50,000,000"
    },

    {
      id: 7,
      stringAmount: "70,000,000"
    },
    {
      id: 11,
      stringAmount: "Khác"
    }
  ]
  ChangeToSlug(slug) {
    //Đổi chữ hoa thành chữ thường
    slug = slug.toLowerCase(); //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d"); //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    ); //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-"); //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-"); //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, ""); //In slug ra textbox có id “slug”
    return slug;
  }

  formatDate(input) {
    if (input == "" || input == null) {
      return ""
    }
    console.log(input.match(/\d+/g))
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + "/" + month + "/" + year;
  }

  formatDateRevert(input) {
    if (input == null || input == "") { return }
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + "-" + month + "-" + year;
  }


  checkEmailValid(email) {
    var vnf_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "") {
      if (vnf_regex.test(email) == false) {
        return "Email của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền Email!";
    }
  }

  checkStringIsNumber(value) {
    const result = /^-?\d+$/.test(value)
    return result ? "" : "Vui lòng nhập tiền với định dạng là số";
  }

  checkAmountInput(value) {
    if (value == "") {
      return "Vui lòng nhập khoản vay mong muốn"
    }
    const result = /^-?\d+$/.test(value)

    if (result) {
      if (parseInt(value) < 1000000) {
        return "Vui lòng nhập số tiền tối thiểu là 1,000,000đ"
      } else if (parseInt(value) > 1000000) {
        if ((parseInt(value) % 500000) != 0) {
          return "Vui lòng nhập khoản vay mong muốn là số chia hết cho 500,000"
        } else {
          return ""
        }
      }
    } else {
      return "Vui lòng nhập tiền với định dạng là số"
    }
  }

  checkPhoneNumber(phone) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phone !== "") {
      if (vnf_regex.test(phone) == false) {
        return "Số điện thoại của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền số điện thoại!";
    }
  }

  checkCMNDNumber(cmnd) {
    var ar = cmnd.split("");
    console.log(ar)
    if (ar.length != 9 && ar.length != 12) {
      return "CMMD / CCCD của bạn không đúng định dạng!"
    }
    var vnf_regex = /(([0-9]{9})\b)/g;
    if (cmnd !== "") {
      if (vnf_regex.test(cmnd) == false) {
        return "CMMD / CCCD của bạn không đúng định dạng!";
      } else {
        return "";
      }
    } else {
      return "Bạn chưa điền CMMD / CCCD!";
    }
  }
  checkEmptyString(string) {
    if (string == "") {
      return "Vui lòng không bỏ trống trường này!"
    }
    return ""
  }
  checkEmptyStringForm(string) {
    if (string == "") {
      return "Vui lòng chọn Khoản Vay Mong Muốn! \n Vui lòng chọn Hình Thức Vay"
    }
    return ""
  }
  checkIsValidCourse(name) {
    return utils.listCourse.indexOf(name)
  }
  listCourse = ["B2", "C", "D", "E", "F"]
};


const utils = new Utils();
export default utils;
