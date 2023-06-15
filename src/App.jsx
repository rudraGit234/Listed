import "./styles.css"
import { useEffect, useState } from "react"
// returning multiple elments from a component use fragment which is an empty tag 
export default function App() {

  //Hooks
  const [newItem, setNewItem] = useState("")
  const [todos, SetTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  //Helper functions 
  const handleSubmit = function (e) {
    e.preventDefault()
    // passs a function when you need to use a current value to the set fucntion 
    SetTodos((currentTodos) => {
      //returning new value because react cant handle the change in a variable value without it, react is weak 
      return [...currentTodos,
      {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false
      }]

    })
    setNewItem("")
  }

  const toggleTodo = function (id, completed) {
    SetTodos(currentTodos => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  const deleteTodo = function (id) {
    SetTodos(currentTodos => {
      return currentTodos.filter(todo => (todo.id !== id))
    })
  }

  //JSX
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e => setNewItem(e.target.value))}
            type="text" id="item" />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header"> To-do List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger">Delete</button>
          </li>
        })}
      </ul>

    </>
  ) // Fragment used cos components  only returns on element
} 