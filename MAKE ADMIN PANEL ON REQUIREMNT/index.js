const express=require("express");
const expressRouter = require("./Routes/Hero.route");
const app=express();
app.use(express.json());
app.use("/",expressRouter);
app.listen(8080,()=>{
    try {
         console.log("Server are running at 8080")
    } catch (error) {
        console.log(error)
    }
})