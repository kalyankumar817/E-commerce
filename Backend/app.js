express=require('express')
mongoose=require('mongoose')
require('dotenv').config();
const cors=require('cors')
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
const cookieParser=require('cookie-parser')

const app=express();


const port=process.env.PORT;
const mongouri= process.env.MONGODB_URI;

mongoose.connect(mongouri)
    .then(()=>console.log('connection established successfully'))
    .catch((err)=>console.log('Error in establishing connection',err))
app.use(express.json())
// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Match your frontend URL
    credentials: true,
}));

// Preflight request handling
app.options('*', cors());

app.use(cookieParser())
app.use('/users',userRoute)
app.use('/users/products',productRoute)
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
