require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser");

const cors =require("cors");
app.use(cors());
// Importing Routers
const authRouter = require("./routes/authentication.js");
const userRouter = require("./routes/user.js")
const categoryRouter = require("./routes/category.js")
const all_productsRouter = require("./routes/all_products")
const ordersRouter = require("./routes/orders")
const paymentRouter = require("./routes/paymentBraintree");

//...MiddleWare app.use
// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors())

// DataBase --> DATABASE=mongodb://localhost:27017/tempDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{ console.log("Server Connected with MongoDB....") })

//Routes
app.use(authRouter);
app.use(userRouter);
app.use(categoryRouter)
app.use(all_productsRouter);
app.use(ordersRouter);
app.use(paymentRouter);

//Starting Server
const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running at ${port}  !`); });