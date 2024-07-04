import express from "express";
import colors from "colors";
import cors from "cors";
import router from "./routes/index.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import requestLogger from "./middleware/requestLogger.mjs";

// APP
const app = express();

// CONNECTION WITH DB
mongoose.connect(process.env.MONGOOSE_URI as string)
    .then(() => {
        console.log(` ✅ - Successfully Connected to MongoDB`)
    })
    .catch(err => {
        console.log(` ❌ - Faild Connected to MongoDB`, err)
    })


// MIDDLEWARES
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(requestLogger)

// ROUTES
app.use(router);


// LISTEN SERVER
app.listen(process.env.PORT, () => {
    console.log(colors.bold(` ✅ - Server running on port ${process.env.PORT}`))
})