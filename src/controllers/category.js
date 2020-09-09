import Category from '../models/category'

//To create delete or update categories you need admin permission

export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.status(201).send({ category })
    } catch (error) {
        res.status(400).send({ error })
    }
}


//TODO: CATEGORIES IN THE FORUM
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        if(!categories){
            res.status(404).send()
        }
        res.send(categories)
    } catch (error) {
        res.status(500).send()
    }
}

export const getCategory = async (req, res) => {
    const _id = req.params.id
    try {
        const category = await Category.findById({_id})
        if(!category){
            res.status(404).send()
        }
        res.send(category)
    }
    catch(e){
        res.status(500).send({ e })
    }
}

export const deleteCategory = async ( req, res ) => {
    const _id = req.params.id
    try {
        const category = await Category.findOneAndDelete({_id})
        if(!category) {
            res.status(404).send()
        }
        res.send(category)

    } catch (error) {
        res.status(500).send({ error })
        console.log(error);
    }
}

