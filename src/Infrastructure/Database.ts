import mongoose from 'mongoose';
const { connect }= mongoose;


async function connect_persistence(): Promise<void>{
    try {
        await connect(process.env.DATABASE_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.info('✅ database connected 🩺 ㏈');
    } catch (error) {
        console.error('❌ Error connecting to database');
        console.error('⬇️ db : ', error);
    }
}

export default connect_persistence;