import React, { Component } from 'react'
import "./NewTodoForm.css";

class NewTodoForm extends Component {
    constructor(props){
        super(props);
        this.state = { todo:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Monitor the state as user types
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
         })
    }

    // Handle form submit and use methods within the parent component
    handleSubmit(evt){
        evt.preventDefault();
        this.props.addTodo(this.state);
        this.setState({ todo: "" })
    }

    render(){
        return (
            <form className="NewTodoForm-form" onSubmit={this.handleSubmit}>
                <label htmlFor='task'>New Todo</label>
                <div className="NewTodoForm-details">
                    <input
                    type="text"
                    name="todo"
                    id="task"
                    placeholder="New Todo"
                    value={this.state.todo}
                    onChange={this.handleChange}
                    />
                    <button><i className="fas fa-plus-circle"></i></button>
                </div>
            </form>
        )
    }
}
export default NewTodoForm;