import React , {useState} from 'react'
import DoneTasks from "./DoneTasks"
import TodoList from './TodoList'
import swal from "sweetalert"

export default function CreateTodo() {

const[todo, setTodo] = useState({title: "" , done:false,date:"" , category:"" })  
const[todoArr , setTodoArr]  = useState({})

let todos = localStorage.hasOwnProperty("todos") ? JSON.parse(localStorage.getItem("todos")) : []
const onChange = (event)=>{
let {value} = event.target
let obj= {}
obj["title"] = value
obj["done"] = false
setTodo(obj)
}
const onChange1 = (event)=>{
let {value} = event.target
setTodo(prev=>{
return{
...prev,
date:value
}
})
}
const onChange2 = (event)=>{
let {value} = event.target
setTodo(prev=>{
return{
...prev,
category:value
}
})
}



const createTodo= (event)=>{
const {name} = event.target
if(event.key === "Enter" || name === "addNewTask" ){
if(todo.title !== ""){
todos.unshift(todo)
localStorage.setItem('todos', JSON.stringify(todos))
setTodo({ title:"" , done: false , date:"" })
}
else{
swal("Oops" , "Please write Todo First" , "error")
}
}
}
const completeTodo = (i) => {
if(todos[i]["done"] !== true){
todos[i]["done"] = true
localStorage.setItem('todos', JSON.stringify(todos))
setTodoArr(todos)
swal("Good Job" , "Todo Completed" , "success");
}
}

const deleteTodo = (i) =>{
swal({
title : "Are you sure?" , 
text:"Once deleted , you will not be able to recover this file!",
icon : "warning" ,
buttons: true ,
dangerMode: true
}).then(res =>{
if(res){
todos.splice(i,1)
localStorage.setItem('todos' , JSON.stringify(todos))
setTodoArr(todos)
}
})

}

return (
<>

    <div className="box">
<div className="text-end">
<h1>React Todo App</h1>
<h3>Add a new Todo</h3>
</div>
<div className="text-addNewTask">
<input type="text" name="todo" placeholder="Write Something..." value={todo.title} onKeyPress={createTodo} onChange={onChange} />
<input type="date" value={todo.date} onChange={onChange1} />
<select name="category" onChange={onChange2}>
<option value="any"selected disabled>Select any option</option>
<option value="personal">Personal</option>
<option value="work">Work</option>
<option value="college">College</option>
</select>
<input type="text" placeholder="Search..." />
<button type="button" className="btn-addTodo"name="addNewTask" onClick={createTodo}>Add a New Task</button>
</div>  
    </div>
<TodoList  todoArr = {todoArr}
completeTodo = {completeTodo}
deleteTodo = {deleteTodo}
/>
<DoneTasks 
todoArr = {todoArr}
/>
</>
  )
}
