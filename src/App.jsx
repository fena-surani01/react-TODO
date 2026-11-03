import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")

  const [tasks , setTasks] = useState(()=>{
    try{
      return JSON.parse(localStorage.getItem("tasks")) || []
    }
    catch{
      []
    }
  })

  const [notification , setNotification] = useState("")

  useEffect(()=>{
    if(notification === "")
    {
      return;
    }

    const timer = setTimeout(()=> setNotification("") , 2000)
    return ()=> clearTimeout(timer)
    
  },[notification])

  useEffect(()=>{
    localStorage.setItem("tasks" , JSON.stringify(tasks))
  },[tasks])

  function addtask()
  {
    if(task.trim() === "")
    {
        return;
    }

    setTasks([...tasks,{text:task , done : false}])
    setNotification(`Task : '${task}' Added SuccessFully!!`)
    setTask("")
  }

  function deleteTask(indexToDelete,item)
  {
      const updatedTask = tasks.filter(
        (item,index) => index !== indexToDelete
       )

       setTasks(updatedTask)
       setNotification(`Task : '${item}' Deleted SuccessFully!!`)

  }

  function toggleTask(indexToToggle)
  {
    setTasks(tasks.map((item, index) =>
      index === indexToToggle ? { ...item, done: !item.done } : item
    ))
  }


  return (
    <div className="todo">
      <h1>My Todo App</h1>

      {notification ? <p key={notification} className="notification">{notification}</p> : ""}

      <div className="add-row">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(event)=>setTask(event.target.value)}
          onKeyDown={(event)=> event.key === "Enter" && addtask()}
        />
        <button className="add-btn" onClick={addtask}>Add Task</button>
      </div>

      {tasks.length === 0 ? <p className="empty">No tasks yet. Add one above.</p> : ""}

      <ul className="task-list">
        {
          tasks.map((item,index)=>(
            <li key={index} className="task">
              <label>
                <input
                  type="checkbox"
                  onChange={()=> toggleTask(index)}
                  checked={item.done}
                />
                <span className={item.done ? "done" : ""}>{item.text}</span>
              </label>

              <button className="delete-btn" onClick={()=> deleteTask(index,item.text)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
