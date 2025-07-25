const {Router} = require('express');
const User = require('../models/user')
const router = Router();

router.get('/signin',(req,res)=>{
    return res.render("signin")
})
router.get('/signup',(req,res)=>{
    return res.render("signup");
})
router.post('/signup',async (req,res)=>{
    try{
        const {fullName , password , email } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/');}
    catch(error){
        res.render('signup',{error:'all fields are required and email should not be registered'})
    }
})

router.post('/signin',async(req,res)=>{
    const { password , email  } = req.body;
    try{
    const token =await User.matchPasswordandgeneratetoken(email,password);
    console.log("token",token);
    return res.cookie("token",token).redirect('/')}
    catch(error){
        res.render('signin',{error:'Incorrect email or password'})
    };

})

router.get('/logout',(req, res)=>{
    res.clearCookie('token').redirect('/');
})
module.exports=router;