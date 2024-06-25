const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo'); // Correct import path
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.get('/get', async (req,res) => {
    try {
        const todos = await TodoModel.find(); // Retrieve all todos from MongoDB
        res.json(todos); // Send todos as JSON response
      } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
      }
});


app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
  const task = req.body.task;
  
  TodoModel.create({ task }) // Shorthand for { task: task }
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req,res) =>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
