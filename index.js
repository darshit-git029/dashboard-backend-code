import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

//data import
import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js"
import Transaction from "./models/Transaction.js"
import overAllStat from "./models/OverAllStat.js"
import AffiliateStat from "./models/AffiliateStat.js"
import {dataUser, dataProduct, dataOverallStat, dataProductStat,dataTransaction, dataAffiliateStat} from "./data/index.js"

//configration
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//Routes
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)

//mongodb connection
const port = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => console.log(`Server port : ${port}`))
}).catch((error) => console.log(`${error} : Not connect`)
)
