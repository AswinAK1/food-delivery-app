import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import 'dotenv/config'
import orderRoute from './routes/orderRoute.js'


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

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

