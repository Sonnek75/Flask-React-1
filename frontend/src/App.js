import React, { Component } from 'react';
import './App.css';
import BasicInputForm from './components/BasicInputForm'
import Todo from './components/Todo'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      testdat: ''
    }
  }

  get_Todos = () => {
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
          data: jsonResponse.todos
        })
      })
      .catch(function () {
        alert('Unable to load todos. Please try your request again');
        return;
      })
  }

  componentDidMount = () => {
    this.get_Todos();
  }

  render() {
    return (
      <div className="App">
        <BasicInputForm get_Todos={this.get_Todos} />
        <div>{this.state.data.map((todo) => (
          <Todo key={todo.id}
            name={todo.name}
            id={todo.id} />
        ))}</div>
      </div>
    )
  }
}

export default App;
