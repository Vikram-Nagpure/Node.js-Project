const fs=require("fs")
const addID = (req,res,next) => {
  // add id the req.body 
const heros=JSON.parse(fs.readFileSync("db.json","utf-8"));
const id=heros.length+1;
req.body.id=id
next()
};

module.exports = {
  addID,
};

