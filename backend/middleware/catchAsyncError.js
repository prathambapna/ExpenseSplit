module.exports=asyncHandlerFunc=>(req,res,next)=>{
    Promise.resolve(asyncHandlerFunc(req,res,next)).catch(next);
};