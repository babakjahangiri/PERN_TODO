import React, { Fragment } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import ListTodos from './components/ListTodo';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
