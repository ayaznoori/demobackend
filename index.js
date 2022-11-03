const express=require('express');
const { default: mongoose } = require('mongoose');
const userModel = require('./Schema/userSchema');
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors())

app.post('/login',async(req,res)=>{
    let data=req.body;
    let check=await userModel.find({email:data.email,password:data.password});
    if(check.length>0){
       res.status(200).send({msg:"User Login in Successfully",data:check})
    }
    else{
        res.status(400).send({error:"Not Found"})
    }

})

app.post('/signup',async(req,res)=>{
     let data=req.body;
     let check=await userModel.find({email:data.email});
     if(check.length>0){
        res.send({error:"User already present"})
     }
    const newdata = new userModel(data);
    newdata.save((err,doc)=>{
        if(err){
            res.send(err)
        }
        else{
            res.sendStatus(201)
        }
     })

})

app.get('/data',async(req,res)=>{
    let data=req.body;
    let check=await userModel.find({email:data.email},{password:0});
    if(check.length>0){
       res.status(200).send({data:check})
    }
    else{
        res.status(400).send({error:"No data found"})
    }
})

app.patch('/userdata/:id',async(req,res)=>{
    let {id}=req.params;
    let data=req.body;
    let check=await userModel.find({_id:id});
    if(check.length>0){
        let data1=check[0].tickets;
        data1.push(data);
        let update=await userModel.findByIdAndUpdate({_id:id},{tickets:data1})
        res.status(200).send({data:update})
    }
    else{
        res.status(400).send({error:"No data found"})
    }

})

let PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    mongoose.connect('mongodb+srv://ayaznoori15:Alam%40123@cluster0.tfjgqr1.mongodb.net/demouser?retryWrites=true&w=majority') 
    console.log('Server Started at -'+PORT)
})