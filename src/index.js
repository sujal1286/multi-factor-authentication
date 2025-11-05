import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/dbConnect.js';
import authRoutes from '../routes/authRoutes.js';
import '../config/passportConfig.js';

dotenv.config();

const app = express();

connectDB();

//middlewares
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true, 
}
app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET || "mysession",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60 // 1 hour
    }
}))
const { json } = express;
app.use(json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));


app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoutes);

//listen app 
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});