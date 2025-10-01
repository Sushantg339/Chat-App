import mongoose from 'mongoose'

export const conntectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log('error connecting to mongodb: ' , error)
        process.exit(1)
    }
}