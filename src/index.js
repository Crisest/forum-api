import express from 'express'
import userRouter from './routers/user'
import './db/mongoose'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

export default app