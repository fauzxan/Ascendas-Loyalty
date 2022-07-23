//image imports
import sands from "./images/sands.png";
import star from "./images/star.png";
import sia from "./images/sia.png";

// import { host } from "./config";
// import Axios from "axios";

// Axios.get(host + "/getloyaltyprogram", {})
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.warn(err.response);
//   });

// Modify here to render cards

const cardDict = [
  {
    id: 1,
    img: sands,
    title: "Sands Group",
    points: "You have X",
  },
  {
    id: 2,
    img: star,
    title: "Star Alliance",
    points: "You have X",
  },
  {
    id: 3,
    img: sia,
    title: "SIA",
    points: "You have X",
  },
  {
    id: 4,
    img: sia,
    title: "SIA",
    points: "You have X",
  },
];

export default cardDict;
