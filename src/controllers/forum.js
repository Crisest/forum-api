import Forum from "../models/forum"

export const createForum = async  (req, res) => {
    const owner = req.user
    const forum = new Forum({
        ...req.body,
        owner
    })
    try {
        await forum.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send()
    }
}

export const getUserForums = async (req, res) => {
    const owner = req.user._id
    try {
        const forums = await Forum.find({ owner })
        if(!forums){
            res.status(404).send()
        }
        res.send({ forums })
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const getUserForumsByID = async (req, res) => {
    const owner = req.params.id
    try{
        const forums = await Forum.find({ owner })
        if(!forums){
            res.status(404).send()
        }
        res.send({ forums })
    }
    catch (e) {
        res.status(500).send({ error })
    }
}