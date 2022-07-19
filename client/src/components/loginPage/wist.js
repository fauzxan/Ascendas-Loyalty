import Axios from "axios";

export const caaaa = () => {
  Axios.get("http://localhost:5000/makeacc")
    .then(() => {
      alert("success");
    })
    .catch((err) => {
      console.warn(err);
    });
};
