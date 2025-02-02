import logo from './logo.svg';
import './App.css';
import React, { act, useState } from 'react';
import { Button, TextInput, ListItem, UnorderedList, Tile } from '@carbon/react';
import '@carbon/styles/css/styles.css';

// function App1() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

const actualDate = new Date();
const dueDate = actualDate.setDate(actualDate.getDate + 10);

function App() {
  const [todos, setTodos] = useState([
    { text: 'Nauczyć się react', isCompleted: false, actualDate, dueDate },
    { text: 'Stworzyć pierwszą aplikacje', isCompleted: false },
    { text: 'Zaliczyć przedmiot', isCompleted: false }
  ]);

  const [value, setValue] = useState('');

  const addTodo = () => {
    if (value.trim() === '') return;
    setTodos([...todos, { text: value, isCompleted: false }]);
    setValue('');
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <Tile className="todo-container">
        <h2>To-Do List</h2>
        <UnorderedList className="todo-list">
          {todos.map((todo, index) => (
            <ListItem key={index} className="todo-item">
              <span className={todo.isCompleted ? 'completed' : ''}>{todo.text}</span>
              <div className="button-group">
                <Button kind="secondary" size="sm" onClick={() => completeTodo(index)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </Button>
                <Button kind="danger" size="sm" onClick={() => removeTodo(index)}>Remove</Button>
              </div>
            </ListItem>
          ))}
        </UnorderedList>
        <div className="input-group">
          <TextInput
            id="todo-input"
            labelText="New Todo"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
          />
          <Button kind="primary" onClick={addTodo}>Add Todo</Button>
        </div>
      </Tile>
    </div>
  );
}

export default App;
