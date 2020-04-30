import React, { Component } from 'react'

export class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            id: this.props.id
          }
    }
    render() {
        return (
            <div>
                <ul>{this.state.name}-{this.state.id}</ul>
            </div>
        )
    }
}

export default Todo
