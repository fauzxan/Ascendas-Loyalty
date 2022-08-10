// this method will be called in the admin navbar

import emailjs from "@emailjs/browser";

const sendMultiple = async (values) => {
	// write a for loop here that goes through all the emails and sends them their status code
	console.log(values);

	for (let i = 0; i < values.length; i++) {
		// write the code to send the email to all the users.
		const temp_obj = {
			to_name: values[i].fullname,
			points: values[i].amount,
			membership_number: values[i].memberid,
			user_email: values[i].email,
            outcomecode: values[i].outcomecode,
            outmsg: getOutcomeMessage(values[i].outcomecode)
		};
		await emailjs.send('contact_service', 'blast', temp_obj, 'dBjhmcgLenXD47XDp').then(result => {
            console.log("email has been sent")
            alert("Bulk emails have been sent.")
        }).catch(err => {
            console.log("error!\n", err)
        })
	}
};



const getOutcomeMessage = (code) => {
    switch (code) {
        case "0000":
          return "Success!";
        case "0001":
          return "Member not found";
        case "0002":
          return "Member name mismatch";
        case "0003":
          return "Member account closed";
        case "0004":
          return "Member account suspended";
        case "0005":
          return "Member ineligible for accrual";
        case "0099":
          return "Unable to process, please contact support for more information";
        default:
          return "Pending";
}
}


export default sendMultiple;
