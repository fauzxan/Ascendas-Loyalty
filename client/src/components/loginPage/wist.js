import Axios from "axios";
import { host } from "../config";

export const caaaa = () => {
  Axios.get("http://localhost:5000/makeacc")
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};
