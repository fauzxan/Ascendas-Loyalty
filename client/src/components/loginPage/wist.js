import Axios from "axios";

export const caaaa = () => {
  Axios.get("https://loyalty-backend.herokuapp.com/makeacc")
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};
