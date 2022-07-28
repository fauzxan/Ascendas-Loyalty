import Axios from "axios";
import { host } from "../config";

export const caaaa = () => {
  Axios.get(host + "/makeacc")
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};

export const seed = () => {
  Axios.post(host + "/resetpts", { email: localStorage.getItem("email") })
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};
