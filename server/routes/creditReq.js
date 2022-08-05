require("../db/config");
const express = require("express");
const creditReq = require("../db/creditReq");
const router = express.Router();

router.post("/", (re,rs,next) =>{
  creditReq.countDocuments({memberid: re.body.memid},function(err,count){
    if(count<=0){
      rs.status(500).send({message:"invalid member id"});
      rs.locals.count=false;
      next();
    }else{
      rs.locals.count=true;
      next();
    }
  });
},
async (re, rs) => {
  if(rs.locals.count){
    let rt = new creditReq(re.body);
    let rl = await rt.save();
    rs.send(rl);
  }else{
    console.log("invalid member id");
  }



});



module.exports = router;
