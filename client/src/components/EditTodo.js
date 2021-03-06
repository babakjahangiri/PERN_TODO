import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const saveTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { description };

      const response = await fetch(
        `${process.env.PUBLIC_URL}/todo/${todo.todo_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      window.location = '/';
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-warning'
        data-toggle='modal'
        data-target={`#todo${todo.todo_id}`}
      >
        Edit
      </button>
      {/*
        id = todo2
      */}
      <div
        className='modal'
        id={`todo${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Todo</h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                onClick={(e) => saveTodo(e)}
              >
                Save
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
