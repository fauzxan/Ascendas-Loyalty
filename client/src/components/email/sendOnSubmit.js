// this method will be called in the partnercardsingular.js when user clicks 'submit' request
import emailjs from '@emailjs/browser';

async function sendOnSubmit (values){
    console.log(values.amount)
    const obj = {
        to_name: localStorage.getItem("user"),
        points: values.amount,
        membership_number: values.membership_number,
        user_email: localStorage.getItem("email")
    }
    await emailjs.send('contact_service', 'contact_form', obj, 'dBjhmcgLenXD47XDp').then(result => {
        console.log("email has been sent")
        alert(
            "Emails have been sent! Check your inbox :)"
        )
    }).catch(err => {
        console.log("error!\n", err)
    })
        
    
} 

export default sendOnSubmit;