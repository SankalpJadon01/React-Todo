import React from 'react'

export default function DoneTasks(props) {
let todoArr = props.todoArr.length > 0 ? props.todoArr : JSON.parse(localStorage.getItem('todos')) 

return (
    
<div className="doneTasks">
<h2 className="doneTasks-title">
Tasks Done...    
</h2>      
<div className="doneTasks-list">
<ul>
{todoArr && todoArr.length > 0  ?
todoArr.filter((el) => el["done"]).map((el, i ) => (
<li key={i}>
<div >{el.title}</div>
</li>

)) : <h5>None task got done...</h5>
}
</ul>   
</div>
    </div>
  )
}
