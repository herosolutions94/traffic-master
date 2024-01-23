import parse from "html-react-parser";
import moment from "moment";
import * as paths from "../constants/paths";

export function doObjToFormData(obj) {
  var formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", JSON.stringify(value));
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, JSON.stringify(obj[key]));
      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}

export function doObjToFormDataWithoutString(obj) {
  var formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", value);
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, obj[key]);
      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}

export function doFirstUpperRestLower(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function doParseHTML(string) {
  return parse(string);
}

export function getBackgroundImageUrl(src) {
  const base_api_url = paths.API_CMS_BG_IMAGES_URL;
  return base_api_url + src;
}

export function getBackgroundImageUrlThumb(src, thumb = 1) {
  const base_api_url = paths.API_CMS_BG_IMAGES_URL;
  if (thumb > 1) return base_api_url + thumb + "p_" + src;
  else return base_api_url + "thumb_" + src;
}

export function getUploadsUrl(folder, src) {
  const base_api_url = paths.API_UPLOADS_URL;
  return base_api_url + folder + "/" + src;
}

export function eventDateFormat(date) {
  return moment(date).format("DD, MMMM YYYY");
}

export function eventTimeFormat(time) {
  return moment(time, "HHmm").format("hh:mm A");
}

export function onlyDayThreeletters(date) {
  return moment(date).format("ddd");
}

export function onlyDateTwoletters(date) {
  return moment(date).format("DD");
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nowPlus6Days() {
  let days = [];
  let daysRequired = 7;

  for (let i = 0; i <= daysRequired; i++) {
    days.push(moment().add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
}

export function jobProgressColor(value) {
  switch (value) {
    case "waiting_on_hold":
    case "completed":
      return "_amber";
    case "received":
    case "accepted":
    case "passed":
    case "not_applicable":
      return "_green";
    case "failed":
    case "withdrawn":
    case "not_invited":
      return "_red";
    default:
      return "";
  }
}

export function getActiveClassname(value) {
  switch (value) {
    case 0:
      return "first_active";
    case 1:
      return "second_active";
    case 2:
      return "third_active";
    case 3:
      return "four_active";
    case 4:
      return "five_active";
    default:
      return "";
  }
}

export function setDefaultLanguage() {
  if (
    localStorage.getItem("site_lang") == null ||
    localStorage.getItem("site_lang") == undefined ||
    localStorage.getItem("site_lang") == ""
  ) {
    localStorage.setItem("site_lang", "french");
  }
}
