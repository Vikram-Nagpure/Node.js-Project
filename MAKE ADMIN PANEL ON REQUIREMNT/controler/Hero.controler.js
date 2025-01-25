const fs = require("fs")
// Get heros data 
const HerosData = (req, res) => {
    // get data the db.json file
    const heros = JSON.parse(fs.readFileSync("db.json", "utf-8"))
    res.json(heros)
}
// heros data added 
const HeroDataAdd = (req, res) => {
    const heros = JSON.parse(fs.readFileSync("db.json", "utf-8"))
    // heros data push the db,
    console.log(req.body)
    heros.push(req.body);
    try {
        fs.writeFileSync("db.json", JSON.stringify(heros))
        res.status(200).json({ message: "Data Added Successfully" });
    } catch (error) {
        res.status(400).json({ message: error?.message })
    }
}
// update the villains information
const HeroUpdate = (req, res) => {
    const { hero_id } = req.params;
    if (!hero_id) {
        res.status(400).json({ message: "id is required" })
    }
    try {
        // add the villains the heros info by the id
        const herosData = JSON.parse(fs.readFileSync("db.json", "utf-8"))
        const Heroes = herosData.find((el) => el.id == hero_id);
        Heroes.villains.push(req.body);
        fs.writeFileSync("db.json", JSON.stringify(herosData))
        if (!Heroes) {
            return res.status(400).json({ message: "Hero not found" })
        }
        res.status(200).json({ message: "Ok" })
    } catch (error) {
        res.status(400).json({ error: error?.message })
    }
}
// delete the heros by id 
const HerosDeleteByid=(req,res)=>{
    const {hero_id}=req.params;
    try{
        // heros data delete the by hero_id
        var heros=JSON.parse(fs.readFileSync("db.json","utf-8"))
        var herosData=heros.filter((el)=>el.id!==parseInt(hero_id))
        if(heros.length===herosData.length){
            return res.status(400).json({message:"Hero not found"})
        }
        heros=herosData
        fs.writeFileSync("db.json",JSON.stringify(heros))
          res.status(200).json({Data:heros})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports = { HerosData, HeroDataAdd, HeroUpdate ,HerosDeleteByid}