import axios from "axios";
import * as paths from "../constants/paths";

export default axios.create({
  baseURL: paths.API_BASE_URL,
  headers: {
    "Content-type": "multipart/form-data"
  }
});
