import mongoose from "mongoose";
import CircularJSON from 'circular-json'

export default async function dbConnect(){
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Mongodb Connected`)
    }catch(err){
        console.error("Error connecting to mongodb database: ", err)
    }
}