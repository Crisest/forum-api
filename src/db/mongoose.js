import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', () => {
    console.log('error');
})

db.on('open', () => {
    console.log('connection stablished succesfully');
})