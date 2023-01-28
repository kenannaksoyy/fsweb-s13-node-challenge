// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model.js");
const projectModel = require("../projects/projects-model.js")

async function validateActionsID(req, res, next){
    try{
        const action = await actionsModel.get(req.params.id);
        if(!action){
            res.status(404).json({
                message:"Action Bulunamadı"
            });
        }
        else{
            req.action = action
            next();
        }
    }
    catch(err){
        res.status(500).json({
            message: "Bir sorun oluştu"
        })
    }
}

async function validateAction(req, res, next){
    try{
        const {project_id, description, notes} = req.body;
        if(!project_id || !description || !notes ){
            res.status(400).json({
                message:"Boş bilgiler bulunmaktadır"
            })
        }
        else{
            const project = await projectModel.get(project_id); 
            if(description.length>128 || !project){
                res.status(400).json({
                    message:"Not 128 karakterden fazla olmamalı veya mevcut proje id yok"
                })
            }
            next();
        }

    }
    catch(err){
        res.status(500).json({
            message: "Bir sorun oluştu"
        })
    }
}

module.exports ={validateActionsID, validateAction};