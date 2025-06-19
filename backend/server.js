require('dotenv').config()
const express=require('express')
const app =express()

const userRouter =require('./routes/route')
app.use(express.json())

const { connectDB } = require('./database/mydbconnection')

app.use('/api',userRouter)

const PORT = process.env.PORT || 5000; 

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
});



