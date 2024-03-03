import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(listenAppAndLog)
.catch(logError)

const listenAppAndLog=()=>{
app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}

const logError=(err) => {
    console.log("MONGO db connection failed !!! ", err);
}
