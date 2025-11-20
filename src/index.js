import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from './db/database.js';

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT;

connectDB().then(() => {
   app.listen(port, '0.0.0.0', () => {
       console.log(`Server is running on port ${port}`);
   });
}).catch((error) => {
   console.error('MongoDB connection error:', error);
   process.exit(1);
});

