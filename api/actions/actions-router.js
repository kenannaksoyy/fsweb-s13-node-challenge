// "eylem" routerını buraya yazın
const express = require('express');
const actionsMW = require("./actions-middlware");
const actionsRouter = express.Router();
const actionsModel = require("./actions-model.js");

actionsRouter.get("/",async(req,res,next)=>{
    try{
        const actions = await actionsModel.get();
        res.status(200).json(actions);
    }
    catch(err){
        next(err);
    }
});

actionsRouter.get("/:id",actionsMW.validateActionsID, async(req, res, next)=>{
    try{
        res.status(200).json(req.action);
    }
    catch(err){
        next(err);
    }
});

actionsRouter.post("/",actionsMW.validateAction, async(req, res, next)=>{
    try{
        const newProject = await actionsModel.insert(req.body);
        res.status(201).json(newProject);
        
    }
    catch(err){
        next(err);
    }
});

actionsRouter.put("/:id",actionsMW.validateActionsID,actionsMW.validateAction, async(req, res, next)=>{
    try{
        const uptadedAction = await actionsModel.update(req.params.id, req.body);
        res.status(201).json(uptadedAction);
    }
    catch(err){
        next(err);
    }
});

actionsRouter.delete("/:id",actionsMW.validateActionsID, async(req, res, next)=>{
    try{
        await actionsModel.remove(req.params.id);
        res.status(201).json({
            message: "Action Delete OK"
        });
    }
    catch(err){
        next(err);
    }
})

actionsRouter.use((err,req,res,next) => {
    res.status(err.status || 500).json({
      customMessage: "Bir sorun oluştu",
      message: err.message
    });
});



module.exports = actionsRouter
