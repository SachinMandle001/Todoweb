require('dotenv').config()
const express = require('express')
const router = express.Router()
const { client } = require('../database/mydbconnection')
const{ObjectId} =require('mongodb')

const getCollection = () => {
    const collection = client.db('mytodo').collection('todos')
    return collection
}

//Trigger-Reminder

//const triggerReminder = require('../utils/trigger_reminder');
//router.get('/todo/trigger', triggerReminder);



//GET METHOD 

router.get('/todo', async (req, res) => {
    try {
        const collection = getCollection()
        const todos = await collection.find({}).toArray()
        res.status(200).json(todos)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//POST METHOD 

router.post('/todo', async (req, res) => {
    try {
        const collection = getCollection();  
        let{task}=req.body          
        let newToDo = await collection.insertOne({task,status:false,progress:0});

        res.status(201).json({task,status:false,progress:0,_id: newToDo.insertedId});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PUT METHOD 

router.put('/todo/:id', async (req, res) => {
    try {
    const collection = getCollection();
    const _id= new ObjectId(req.params.id)
    const updated =req.body
    const updatedOne= await collection.updateOne({_id},{$set:updated})
    res.status(200).json(updatedOne)
    } catch (error) {
         console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
})

//DELETE METHOD

router.delete('/todo/:id', async (req, res) => {
    try {
    const collection = getCollection();
    const _id= new ObjectId(req.params.id)
    const deletedOne=await collection.deleteOne({_id})
    res.status(200).json(deletedOne)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})
module.exports = router