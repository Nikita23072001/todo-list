import logo from './logo.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import React, { act, useState, useEffect } from 'react';
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

function App() {
  const [todos, setTodos] = useState([
    { text: 'Nauczyć się react', isCompleted: false, actualDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), completionDate: null },
    { text: 'Stworzyć pierwszą aplikacje', isCompleted: false, actualDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), completionDate: null },
    { text: 'Zaliczyć przedmiot', isCompleted: false, actualDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), completionDate: null }
  ]);

  const [value, setValue] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos([...todos]);
    }, 1000);
    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = () => {
    if (value.trim() === '') return;
    const newTodo = {
      text: value,
      isCompleted: false,
      actualDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
      completionDate: null
    };
    setTodos([...todos, newTodo]);
    setValue('');
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    newTodos[index].completionDate = newTodos[index].isCompleted ? new Date() : null;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const calculateRemainingTime = dueDate => {
    const now = new Date();
    const timeDiff = dueDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
  };

  const formatCompletionTime = completionDate => {
    return `Completed on: ${completionDate.toLocaleString()}`;
  };

  return (
    <div className="app">
      <Tile className="todo-container">
        <h2>To-Do List</h2>
        <UnorderedList className="todo-list">
          {todos.map((todo, index) => (
            <ListItem key={index} className="todo-item">
              <span className={todo.isCompleted ? 'completed' : ''}>{todo.text}</span>
              <div className="dates" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Created: {todo.actualDate.toLocaleDateString()}</span>
                <span>Due: {todo.dueDate.toLocaleDateString()}</span>
                <span>
                  {todo.isCompleted ? formatCompletionTime(todo.completionDate) : calculateRemainingTime(todo.dueDate)}
                </span>
              </div>
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