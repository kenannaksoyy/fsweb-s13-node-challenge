function logger (req, res, next){
    const {method, originalUrl} = req;
    const time = new Date().toLocaleString();
    if(originalUrl.includes("projects")){
        console.log(`Projeler İşlem: [${time}] ** ${method} -> ${originalUrl}`);
    }
    if(originalUrl.includes("actions")){
        console.log(`Aksiyonlar İşlem: [${time}] ** ${method} -> ${originalUrl}`);
    }
    next();
}
module.exports = {logger}