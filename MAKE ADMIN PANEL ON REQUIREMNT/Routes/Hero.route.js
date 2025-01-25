const express=require("express");
const {HerosData, HeroDataAdd, HeroUpdate, HerosDeleteByid} = require("../controler/Hero.controler");
const { logger } = require("../middlewares/logger.middleware");
const { addID } = require("../middlewares/addID.middleware");
const { auth } = require("../middlewares/auth.middleware");
const app=express();
const expressRouter=express.Router();
expressRouter.get("/heroes",logger,HerosData)
expressRouter.post("/add/heroes",addID,logger,HeroDataAdd)
expressRouter.patch("/update/villain/:hero_id",auth,logger,HeroUpdate)
expressRouter.delete("/delete/hero/:hero_id",auth,logger,HerosDeleteByid)
module.exports=expressRouter