import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://taskapp:Crisesttaskapp@cluster0-vwwtg.mongodb.net/forum?retryWrites=true&w=majority' ,{
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