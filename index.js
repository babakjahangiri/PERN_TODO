const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
require('dotenv').config();

//Midlleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post('/todo', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//get all todos
app.get('/todolist', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todoItem = await pool.query(
      'SELECT * FROM todos WHERE todo_id = $1',
      [id]
    );
    res.json(todoItem.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );
    //res.json(updateTodo.rowCount); number of row updated
    res.json('todo was updated!');
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json('todo was deleted');
  } catch (error) {
    console.error(error.message);
  }
});

//Serve static file if in production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log('server is running on port 5000');
});
