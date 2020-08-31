
export default async (req, res, next) => {
    if(req.user.isAdmin === true){
        next()
    }
    else{
        res.status(401).send()
    }
}