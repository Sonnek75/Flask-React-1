import React, { Component } from 'react'
import '../stylesheets/BasicInputForm.css'

export default class BasicInputForm extends Component {
    constructor(props) {
        super();
        this.state = {
            input: ""
        }

    }

    submitData = (event) => {
        event.preventDefault();
        const route = 'todos';
        fetch(`http://127.0.0.1:5000/${route}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.input })
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.props.get_Todos();
            })
            .catch(function () {
                alert('Unable to add todo. Please try your request again');
                return;
            })
        document.getElementById('inputForm').reset();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className='inputForm' id='basicForm'>
                <form id='inputForm' onSubmit={this.submitData}>
                    <input type='text' name='input' placeholder='Input Here' onChange={this.handleChange} />
                    <input type='submit' id='Submit' name='submit' />
                </form>
            </div>
        )
    }
}
