const jwt = require('jsonwebtoken');
const JWT_secret = "sarmad is a great man"// for auth token

const fetchvendor=(req,res,next)=>{

    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send({error:"Please authentictate by providing the token"});
    }
    try {
        const data=jwt.verify(token,JWT_secret);
        req.vendor=data.vendor;
        next();
    } catch (error) {
        return res.status(401).send({error:"Please authentictate by providing the valid token"});
    }

}

module.exports=fetchvendor;