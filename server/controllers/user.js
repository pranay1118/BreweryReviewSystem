const User=require('../models/user');
exports.createUsers=async(req,res)=>{
      const data=req.body;
      try{
        const user=new User(data);
        const savedUser=await user.save();
        if(savedUser){
           return res.status(201).json({
                status:0,
                message:'User created successfully 😃',
                user:savedUser
            })
        }
       return res.status(400).json({
            status:1,
            message:'User is not created 😢'
        })
      }
      catch(err){
       return res.status(400).json({
            status:1,
            message:'Something went wrong 😢'
        })
      }
}
exports.getAllUsers=async(req,res)=>{
    try{
       const existUsers=await User.find();
       if(existUsers){
        res.status(201).json({
            status:0,
            users:existUsers
        })
    }
    res.status(400).json({
        status:1,
        message:'User list is not fetched😢'
    })
    }
    catch(err){
        res.status(400).json({
            status:1,
            message:'Something went wrong 😢'
        })
    }
}
exports.login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const existUser=await User.findOne({username});
        if(!existUser){
            return res.status(400).json({
                status:1,
                message:'username is present in database'
            })
        }
        console.log(existUser,"d")
        console.log(password,"sd")
        if(existUser.password===password){
            return res.json({
                status:0,
                userId:existUser._id,
                message:'login successful!!'
            })
        }
        return res.status(400).json({
            status:1,
            message:"wrong password"
        })
    }catch(err){
        return res.status(400).json({
            status:1,
            message:"Something went wrong!!"
        })
    }
}