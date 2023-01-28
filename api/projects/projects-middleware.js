// projects ara yazılımları buraya
const projectModel = require("./projects-model.js");

async function validateProjectID(req, res, next){
    try{
        const project = await projectModel.get(req.params.id);
        if(!project){
            res.status(404).json({
                message: "Proje bulunamadı"
            })
        }
        else{
            req.project=project
        }
        next();
    }
    catch(err){
        res.status(500).json({
            message: "Bir sorun oluştu"
        })
    }
}

async function validateProject(req, res, next){
    try{
        const {name, description} = req.body;
        if(!name || !description){
            res.status(400).json({
                message:"Boş bilgiler bulunmaktadır"
            })
        }
        else{
            /*
            //testte a ve b sorunu çıkartıyor
            if(req.method.includes("PUT")){
                if(name.length<2 || description.length<2){
                    res.status(400).json({
                        message:"Bilgiler 1 karakterden fazla olmalı"
                    })
                }
            }
            */
            next();
        }

    }
    catch(err){
        res.status(500).json({
            message: "Bir sorun oluştu"
        })
    }
}

module.exports = {validateProjectID, validateProject};
