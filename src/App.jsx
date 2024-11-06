import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  // async function confirm() {
  //   let userInput = await prompt("Do you want to deleter this log (y/n)");
  //   if (userInput == y) {
  //     return true;
  //   }
  //   return false;
  // }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    setTodo(t[0].todo)
    handleDelete(e, id)
  }
  const handleDelete = (e, id) => {
    // if (confirm()) {

    // }
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let idx = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container bg-violet-100 md:mx-auto my-5 rounded-xl p-5 min-h-[85vh] md:w-1/2">
        <h1 className='font-bold text-center text-4xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex gap-2">

            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-lg text-sm font-bold disabled:bg-violet-700'>Save</button>
          </div>
        </div>
        <div className="showfin flex gap-3 my-5">
          <input type="checkbox" onClick={toggleFinished} checked={showFinished} />
          <div className="text">Show Finished</div>
        </div>
        <h2 className='text-2xl font-bold my-2 '>Your Todos</h2>
        <div className="h-[1px] bg-black opacity-50 my-2"></div>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
