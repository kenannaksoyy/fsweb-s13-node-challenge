// "project" routerını buraya yazın!
const express = require('express');
const projectsRouter = express.Router();
const projectsModel = require("./projects-model.js");
const projectsMW = require("./projects-middleware.js");

projectsRouter.get("/",async(req,res,next)=>{
    try{
        const projects = await projectsModel.get();
        res.status(200).json(projects);
    }
    catch(err){
        next(err);
    }
});

projectsRouter.get("/:id",projectsMW.validateProjectID, async(req, res, next)=>{
    try{
        res.status(201).json(req.project);
    }
    catch{
        next(err);
    }
});

projectsRouter.post("/", projectsMW.validateProject, async(req, res, next)=>{
    try{
        const newProject = await projectsModel.insert(req.body);
        res.status(201).json(newProject); 
    }
    catch(err){
        next(err);
    }
});

projectsRouter.put("/:id",projectsMW.validateProjectID,projectsMW.validateProject,async(req, res, next)=>{
    try{
        const uptadedProject = await projectsModel.update(req.params.id, req.body);
        res.status(201).json(uptadedProject);
    }
    catch(err){
        next(err);
    }
});

projectsRouter.delete("/:id",projectsMW.validateProjectID,async(req, res, next)=> {
    try{
        await projectsModel.remove(req.params.id);
        res.status(201).json({
            message: "Project Delete OK"
        })
    }
    catch(err){
        next(err);
    }
});

projectsRouter.get("/:id/actions",projectsMW.validateProjectID, async(req, res, next)=>{
    try{
        const projectActions = await projectsModel.getProjectActions(req.params.id);
        res.status(201).json(projectActions);
    }
    catch(err){
        next(err);
    }
});


projectsRouter.use((err,req,res,next) => {
    res.status(err.status || 500).json({
      customMessage: "Bir sorun oluştu",
      message: err.message
    });
  });

  module.exports = projectsRouter;