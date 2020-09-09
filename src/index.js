import express from 'express'
import userRouter from './routers/user'
import categoryRouter from './routers/category'
import postRouter from './routers/post'
import replyRouter from './routers/reply'
import forumRouter from './routers/forum'
import './db/mongoose'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(postRouter)
app.use(replyRouter)
app.use(forumRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

export default app