const express = require('express')
// const mongoose = require('mongoose');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// const todos = [] // to storre the dat a

app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/todo-app').then(
    ()=>{
        console.log("dbConnected");
        
    } //connet to mongo dp
    
).catch((err)=>{ 
    console.log(err);
    
})
 const newSchema = new mongoose.Schema({
    title:{
        required : true,
        type : String
    },
    description:String
})
const newModel= mongoose.model('Todo',newSchema)
// checking
// app.get('/',(req,res)=>{
//     res.send("first sucess")
// })



app.use(express.json())// it will grenate the page in json file

//this is for create a item
app.post('/todos',async(req,res)=>{
    const {
        title,
        description
    } =req.body
    



 try{
    const newToDo = new newModel({title,description})
      await newToDo.save()
    res.status(201).json(newToDo)
 }
 catch(error){
    console.log(error);
    res.status(500).json({message:error.message})
 }
  
})


// this is for get the item
app.get('/todos',async(req,res)=>{
    
    try{
   const  todos = await newModel.find()
   res.json(todos)
}
catch(error){
    res.status(500).json({message:error.message})
}
    
})

//update
app.put('/todos/:id', async(req,res)=>{

    try {
        const {title,description} = req.body
    const id = req.params.id
    const updateToDo = await newModel.findByIdAndUpdate(
        id,{title,description},
        {new:true}
    )
    if (!updateToDo){
        return res.status(404).json({message:"this ToDo is not founded"})
    }
    res.json(updateToDo)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//delete
app.delete('/todos/:id',async(req,res)=>{
try {
    const id = req.params.id
     const deleteToDo = await newModel.findByIdAndDelete(id)
     res.status(200).end()

} catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
}  
})
//port
app.listen(8000,()=>{console.log("server Connect");
})