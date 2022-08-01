// this method will be called in the admin navbar

import emailjs from '@emailjs/browser';
import Axios from 'axios'

const sendMultiple = async(values) => {
    // write a for loop here that goes through all the emails and sends them their status code
    console.log(values)
    /*
    for (let i=0; i<values.length; i++){
        // write the code to send the email to all the users.
        emailjs.send('')
    }
    */
}


export default sendMultiple;
