import Reply from "../models/reply"

export const createReply = async ( req, res ) => {
    const post = req.params.id
    const owner = req.user._id
    const reply = new Reply({...req.body, post, owner})
    try {
        await reply.save()
        res.status(201).send({reply})
    } catch (error) {
        res.status(400).send({error})   
    }
}

export const getRepliesByPost = async ( req, res ) => {
    const post = req.params.id
    try {
        const replies = await Reply.find({ post })
        if(!replies){
            res.status(404).send()
        }
        res.send({ replies })
    } catch (error) {
        res.status(500).send()
    }

}

export const getRepliesByUser = async ( req, res ) => {
    try {
        const owner = req.params.id
        const replies = await Reply.find({ owner })
        if(!replies){
            res.status(404).send()
        }
        res.send({ replies })
    } catch (error) {
        res.status(500).send()
    }
}

export const getMyReplies = async ( req, res ) => {
    try {
        const replies = await Reply.find({ owner: req.user._id })
        if(!replies){
            res.status(404).send()
        }
        res.send({ replies })
    } catch (error) {
        res.status(500).send()
    }
}
  
export const deleteReplyByID = async ( req, res ) => {
    try {
        if(req.user.isAdmin){
            console.log("isAdmin");
            const reply = await Reply.findOneAndDelete({_id: req.params.id})
            if(!reply){
                res.status(404).send()
            }
            res.send({ reply })
        }
        else{
            console.log("isNotAdmin");
            const reply = await Reply.findOne({ _id: req.params.id})
            if(!reply){
                res.status(404).send()
                console.log("not reply");
            }
            else if(reply.owner.toString() !== req.user._id.toString()){    
                res.status(401).send()
                console.log("Not the same owner");
            }
            else{
                console.log("success");
                await reply.remove()
                res.send({ reply })
            }
        }
    } catch (error) {
        res.status(500).send()
    }
}

export const updateReplyByID = async ( req, res ) => {
    try {
        if(req.user.isAdmin){
            const reply = await Reply.findByIdAndUpdate({_id: req.params.id}, req.body)
            if(!reply){
                res.status(404).send()
            }
            res.send({ reply })
        }
        else{
            const reply = await Reply.findOne({ _id: req.params.id})
            if(!reply){
                res.status(404).send()
                console.log("not reply");
            }
            else if(req.user._id.toString() !== reply.owner.toString()){    
                res.status(401).send()
            }
            else{
                reply.description = req.body.description
                await reply.save()
                res.send({ reply })
            }
        }
    } catch (error) {
        res.status(500).send()
    }
}

