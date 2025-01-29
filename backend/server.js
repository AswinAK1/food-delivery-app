import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js'
import cartRouter from './routes/cartRoute.js'
import foodRouter from './routes/foodRoute.js'
import orderRoute from './routes/orderRoute.js'
import userRouter from './routes/userRoute.js'


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
const allowedOrigins = ['https://food-delivery-app-weld-nu.vercel.app', 'https://food-delivery-app-rrur.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// DB connection
connectDB()

// api endpoint
app.use("/api/food",foodRouter)
app.use('/images', express.static('uploads'));
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order",orderRoute)



app.get("/",(req,res)=>{
  res.send('api working')
})

app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})

