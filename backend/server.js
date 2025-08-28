require('dotenv').config()
const express=require('express')
const app =express()
const path=require('path')
const cron=require('node-cron')
const axios=require('axios')

const userRouter =require('./routes/route')
app.use(express.json())

const cors = require("cors");

app.use(cors({
  origin: "https://sachin-todowebapp-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// app.use(express.static(path.join(__dirname,'dist')))

const { connectDB } = require('./database/mydbconnection')

// app.get('/',(req, res)=>{
//     res.sendFile(path.join(__dirname,'dist/index.html'))
// })

app.use('/api',userRouter)

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

cron.schedule('*/10 * * * *', async () => {
  try {
    const res = await axios.get('https://sachin-todowebapp-backend.onrender.com/health');
    console.log(`Self-ping success: ${res.status}`);
  } catch (err) {
    console.error('Self-ping failed:', err.message);
  }
});
const PORT = process.env.PORT || 5000; 

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
});



