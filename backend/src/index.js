import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js" 
import messageRoutes from './routes/message.routes.js'
import dbConnect from './lib/dbConnect.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import {app,server} from './lib/socket.js'
dotenv.config()


const port = process.env.PORT || 4000
const __dirname = path.resolve()
dbConnect()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())

app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase the limit for URL-encoded payloads

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})