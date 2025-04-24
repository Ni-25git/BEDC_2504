const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());

const dbpath = path.join(__dirname, 'db.json');

// Function to read data from db.json
const readData = () => {
    return JSON.parse(fs.readFileSync(dbpath, 'utf-8')); // ✅ Added return
};

// Function to write data to db.json
const writeData = (data) => {
    fs.writeFileSync(dbpath, JSON.stringify(data, null, 2));
};

// GET all todos
app.get('/todos', (req, res) => {
    const db = readData();
    res.status(200).json(db.todos);
});
app.post('/todos', (req, res) => {
    const db = readData()
    const {title , status} = req.body
    const newTodo = {id:db.todos.length ? db.todos[db.todos.length-1].id+1: 1,title ,status:status||false}
    db.todos.push(newTodo)
    writeData(db)
    res.status(200).json({message : 'Todo added' , newTodo});
});

app.put('/todos', (req,res)=>{
    const db = readData();
    let updated = false 
    db.todos.forEach(todo=>{
        if(todo.id%2===0){
            todo.status=true;
            updated= true
        }
    })
    if(updated){
        writeData(db)
        res.status(200).json({ message: 'Todos with even IDs have been updated with status = true' });
    }else{
        res.status(404).json({ message: 'No todos with even ID and false status were found' });
    }
  
})
app.delete('/todos', (req, res) => {
    const db = readData();

    // Filter out todos whose status is true
    const initialLength = db.todos.length;
    db.todos = db.todos.filter(todo => todo.status !== true);

    // Check if any todos were deleted
    if (db.todos.length < initialLength) {
        writeData(db);
        res.status(200).json({ message: 'Todos with status true have been deleted' });
    } else {
        res.status(404).json({ message: 'No todos with status true were found' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
