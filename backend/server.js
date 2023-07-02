const app=require("./app");

const dotenv=require("dotenv");
const connectDatabase =require("./config/database");

//handling uncaught exception
//eg you write console.log(abcd) , abcd not defined hence will throw error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})



//config
dotenv.config({path:"backend/config/config.env"})


//connecting to database
connectDatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`);
});

//unhandled promise reject
//suppose in config some url is wrong (try for wrong DB_URI)
process.on("unhandledRejection",err=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
})