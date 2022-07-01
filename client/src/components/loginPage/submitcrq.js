const submitcrq = async (date, fullname, partnercode, memberid, amount)=>{
    let result = await fetch("https://loyalty-backend.herokuapp.com/submitcreditreq", {
      method: 'post',
      body: JSON.stringify({ memberid, fullname, date, amount, partnercode }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    return result._id;
}

export default submitcrq;