import React, { Component } from 'react'
import '../stylesheets/Todo.css'

export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            num: this.props.num,
            id: this.props.id,
            completed: this.props.completed
        }
    }

    render() {
        return (
            <div className="todo">
                <ul className="todoText">{this.state.num}. {this.state.name.toUpperCase()}
                    <input className="deleteBtn" type="button" data-id={this.props.id} onClick={this.props.delete} value="Delete" />
                    <input type="checkbox" defaultChecked={this.state.completed}></input>
                </ul>
            </div>
        )
    }
}

export default Todo
