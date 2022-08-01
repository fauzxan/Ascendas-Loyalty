import Axios from "axios";
import { bh, host } from "../config";

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
  Axios.post(bh + "/resetpts", { email: localStorage.getItem("email") })
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};
