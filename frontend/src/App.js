import React, { Component } from 'react';
import './App.css';
import TodoInputForm from './components/TodoInputForm'
import Todo from './components/Todo'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      todos: [],
      num: 1
    }
  }

  getTodos = () => {
    const route = 'todos';
    fetch(`http://127.0.0.1:5000/${route}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          todos: jsonResponse.todos
        })
      })
      .catch(function () {
        alert('Unable to load todos. Please try your request again');
        return;
      })
  }

  deleteTodo = (event) => {
    if (window.confirm('Are you sure you want to delete the item?')) {
      event.preventDefault();
      const id = event.target.dataset['id'];
      const route = `todos/${id}`;
      fetch(`http://127.0.0.1:5000/${route}`, {
        method: 'DELETE',
      })
        .then(() => {
          window.location.reload(true);
        })
        .catch(function () {
          alert('Unable to delete todo. Please try your request again');
          return;
        })
    }
  }

  componentDidMount = () => {
    this.getTodos();
  }

  render() {
    return (
      <div className="App">
        <h1>Basic To-Do App</h1>
        <TodoInputForm get_Todos={this.getTodos} />
        <h2>Todo List:</h2>
        <div className="todoList">{this.state.todos.map((todo, index) => (
          <Todo key={todo.id}
            name={todo.name}
            num={index + 1}
            id={todo.id}
            completed={todo.completed}
            delete={this.deleteTodo} />
        ))}</div>
      </div>
    )
  }
}

export default App;
