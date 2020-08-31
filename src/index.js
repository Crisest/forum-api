import express from 'express'
import userRouter from './routers/user'
import categoryRouter from './routers/category'
import postRouter from './routers/post'
import './db/mongoose'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(postRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

export default app