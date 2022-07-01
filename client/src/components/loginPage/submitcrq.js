import React from 'react';

const submitcrq = async (date, fullname, partnercode, memberid, amount)=>{
    let result = await fetch("https://loyalty-backend.herokuapp.com/submitcreditreq", {
      method: 'post',
      body: JSON.stringify({ memberid, fullname, date, amount, partnercode }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
}

export default submitcrq;