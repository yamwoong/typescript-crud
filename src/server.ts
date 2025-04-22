import app from './app';
import connectDB from './config/mongo';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});