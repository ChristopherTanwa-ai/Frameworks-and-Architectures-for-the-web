import { useState } from "react"
import "./Styles.css"
import {randomUUID} from "crypto"
interface TodoItem{
  id: string;
  title: string;
  completed: boolean;
}
export default function App(){
  const [newItem, setNewItem] = useState("")
  const [todo, setTodo] = useState<TodoItem[]>([])

  function handleSubmit(e: any){
    e.preventDefault()

    setTodo(currentTodo => {
      return[
        ...currentTodo,
        {id: crypto.randomUUID(), title:newItem, completed:false},
      ]
    })

    setNewItem("")
  }

  function toggleTodo(id:any, completed:boolean) {
    setTodo(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  return(
  <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
      <label htmlFor="item">New item</label>
      <input value={newItem}
      onChange={e => setNewItem(e.target.value)}
      type="text"
      id="item" />
      <button className="btn">Add</button>
      </div>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      {todo.map(todo => {
        return (<li key={todo.id}>
        <label htmlFor="">
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
          {todo.title}
        </label>
        <button className="btn btn-danger">Delete</button>
      </li>)
      })}
    </ul>
  </>
  )
}