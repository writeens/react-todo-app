import React, { Component } from 'react';
import "./Todo.css";

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = { isEditing: false, todo:this.props.task }
        this.renderTodo = this.renderTodo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh(){

    }
    handleEdit(){
        this.setState({
            isEditing: !this.state.isEditing
        })
        console.log("editing");
    }

    handleRemove(evt){
        evt.preventDefault();
        this.props.removeTodo(this.props.index);
    }

    handleUpdate(evt){
        this.props.updateTodo(this.props.index, this.state.todo);
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleChange(evt){
        this.setState({
            todo: evt.target.value
         })
    }
    
    handleClick(evt){
        this.props.toggleTodo(this.props.id);
    }

    renderTodo(){
        const {date, task, completed} = this.props;
        return (
            (this.state.isEditing) ? 
            <div className="Todo-edit">
                <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
                    <input
                        type="text"
                        name="todo"
                        value={this.state.todo}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleRefresh}>SAVE</button>
                </form>
            </div>
            : 
            <div>
                <div className="Todo-todo">
                    <li className="Todo-li">
                        <div className={(completed) ? "Todo-completed Todo-text" : "Todo-text"}>
                            {task}
                        </div>
                    </li>
                    <div className="Todo-buttons">
                        <button className="Todo-edit" onClick={this.handleEdit}><i className="fas fa-edit"></i></button>
                        <button className="Todo-remove" onClick={this.handleRemove}><i className="fas fa-window-close"></i></button>
                    </div>
                </div>
                <p id="date" className="Todo-date">{date}</p>
            </div>
            
        );
    }
    render(){
        return (
            <div onClick={this.handleClick} className="Todo" style={{backgroundColor: this.props.color}}>
                {this.renderTodo()}
            </div>
        )
    }
}
export default Todo;