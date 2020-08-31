import Post from '../models/post'

export const getPostbyUser = async ( req , res ) => {
    const owner = req.params.id
    try {
        const posts = await Post.find({ owner })
        if(!posts){
            res.status(404).send()
        }
        res.send({posts})
    } catch (error) {
        res.status(500).send()
    }
}

export const getMyPosts = async (req, res) => {
    console.log(req.user);
    try {
        
        await req.user.populate({
            path: 'posts'
        }).execPopulate()
        res.send(req.user.posts)
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

export const getPostByCategory = async (req, res) => {
    const category = req.params.id
    try {
        const posts = await Post.find({category})
        if(!posts){
            res.status(404).send()
        }
        res.send({posts})
    } catch (error) {
        res.status(500).send()
        console.log(error);
    }
}

export const createPost = async ( req, res ) => {
    try {
        const post = new Post(req.body)
        post.owner = req.user._id
        post.category = req.params.id
        await post.save()
        res.status(200).send({post})
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}

export const deletePostByID = async ( req, res ) => {
    try {
        const category = req.params.categoryID
        const _id = req.params.id
        const owner = req.user._id
        const post = await Post.deleteOne({ owner, _id, category })
        if(!post){
            res.status(404).send()
        }
        res.send({post})
        
    } catch (error) {
        res.status(500).send()
    }
}

export const updatePost = async ( req, res ) => {
        let updatesAllowed = []
        const updatesAdmin = ['title', 'description']
        const updatesNoAdmin = ['description']
        if(req.user.isAdmin){
            updatesAllowed = updatesAdmin
        }
        else{
            updatesAllowed = updatesNoAdmin
        } 
        const updates = Object.keys(req.body)
        const isValid = updates.every((update) => updatesAllowed.includes(update))
        if(!isValid){
            res.status(400).send({error: 'Invalid updates'})
        }
       try {
            const post = await Post.findOne({owner: req.user._id, _id: req.params.id, category: req.params.categoryID})
            if(!post){
                res.status(404).send()
            }
            updates.forEach((update) => post[update] = req.body[update])
            await post.save()
            res.send({post})
       } catch (error) {
           res.status(500).send()
           console.log(error);
       }

}