import React, { Component } from 'react'
import uuid from "uuid/v4";
import localforage from "localforage";
import NewTodoForm from './NewTodoForm';
import Todo from "./Todo";
import "./TodoList.css";
import colors from "./colors";

class TodoList extends Component {
    static defaultProps = {
        color: colors
    }
    constructor(props){
        super(props);
        this.state = { todos: [] };
        this.add = this.add.bind(this);
        this.render = this.render.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    componentDidMount(){
        // localforage.clear()
        localforage.iterate((value, key, index) => {
            localforage.getItem(key, (err, value) => {
                if(err || value === null){
                    this.setState({ todos: [] })
                }else {
                    this.setState(currentState => ({
                        todos: [...currentState.todos, value]
                    }))
                }
            })
        })
        
    }

    //Method to add an item (todo object) to the state
    add(item){
        let newItem = {...item, 
            id:uuid(),
            date:Date(Date.now()).toString().slice(0, 15), 
            completed: false, 
            index: this.state.todos.length + 1,
            color: colors()
        }
        // Store todo item and then update the state
        localforage.setItem(`"${newItem.index}"`, newItem).then(value => {
            this.setState(currentState => ({
                todos: [...currentState.todos, value]
            }))
        })
        console.log(this.state.todos);
        // 
        
    }

    // Remove todo method
    remove(index){
        console.log(index);
        // Remove the todo object from storage based on index then update the state
        localforage.removeItem(`"${index}"`).then(() => {
            this.setState({
                todos: this.state.todos.filter(todo => todo.index !== index)
            })
        })
    }

    // Update todo method
    update(index, newTodo){
        let oldTodos = this.state.todos 
        //Create a new array with updated todos
        let updatedTodos = oldTodos.map((todo) => {
            if(todo.index === index){
                todo = {...todo, todo:newTodo}
            }
            return todo;
        });
        
        // Clear old array from local forage
        // Add each todo from the new array to local storage 
        // Attach the index to each new item 
        localforage.clear().then(() => {
            let array = [];
            updatedTodos.map(todo => {
                array = [...array, todo]
                console.log(array);
                localforage.setItem(`"${todo.index}"`, todo).then(value => {
                    this.setState({ todos: array })
            })
            return null;
            
        })})
    }

    toggleCompletion(id){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        })
    }

    renderTodo(){
        let todos = this.state.todos.map(todo => 
            <Todo 
                task={todo.todo}
                key={todo.id}
                date={todo.date}
                id = {todo.id}
                completed = {todo.completed}
                removeTodo={this.remove}
                updateTodo={this.update}
                toggleTodo={this.toggleCompletion}
                index={todo.index}
                color={todo.color}
            />)
        return todos
    }

    render(){
        return (
            <div>
                <h1><span className="TodoList-what">What </span><span className="TodoList-todo">To-do</span><span className="TodoList-q">?</span></h1>
                <NewTodoForm addTodo={this.add}/>
                <ul className="TodoList-ul">
                    {this.renderTodo()}
                </ul>
            </div>
        )
    }
}
export default TodoList;