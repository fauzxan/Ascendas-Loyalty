//image imports
import sands from "./images/sands.png";
import star from "./images/star.png";
import sia from "./images/sia.png";

import { host } from "./config";
import Axios from "axios";

var partnerCardDict = [];
async function getLoyaltyProgram() {
	await Axios.get(host + "/getloyaltyprogram").then((res) => {
		console.log(res.data);
		for (let i=0; i<res.data.length ; i++){
      partnerCardDict.push(res.data[i])
    }
	});
	console.log("partnercarddict ");
	console.log(partnerCardDict);
}
// Modify here to render cards

getLoyaltyProgram()
export default partnerCardDict;
