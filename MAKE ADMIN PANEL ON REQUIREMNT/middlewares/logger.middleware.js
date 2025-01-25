const fs = require("fs")

const logger = (req, res, next) => {
  // write message the logs.txt file
  const date = new Date();
  const message = `url: ${req.url},Method:${req.method},Time:${date.toString()}\n`
  fs.appendFileSync("logs.txt", message,(err)=>{
    if(err) console.log(err)
  })
  next()
};

module.exports = {
  logger,
};

