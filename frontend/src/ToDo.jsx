import { FaTrash } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from "react";
function ToDo({todo,setToDos}) {
  const [myprogress, setMyprogress] = useState(0)

  //FOR PROGRESS BAR

 const updateProgress = async(todoId,todoProgress)=>{

        const res =await fetch(`/api/todo/${todoId}`,{
        
        method: "PUT",
        body: JSON.stringify({progress: todoProgress }),
        headers: {
          "Content-Type": "application/json"
        }
        })
        const data = await res.json();
        
    if(data.acknowledged){
      console.log(todo.progress)

      setToDos((curentTodos)=>{
        return curentTodos.map((current)=>{
          if(current._id===todoId){
            return { ...current, progress:!current.progress}
          }
          else return current
        })
      })
    }
      }


  
    //UPDATE OPERATION 

    const updateToDo = async(todoId,todoStatus)=>{

        const res =await fetch(`/api/todo/${todoId}`,{
        
        method: "PUT",
        body: JSON.stringify({status: todoStatus }),
        headers: {
          "Content-Type": "application/json"
        }
        })

    const data = await res.json();
    if(data.acknowledged){
      setToDos((curentTodos)=>{
        return curentTodos.map((current)=>{
          if(current._id===todoId){
            return { ...current, status:!current.status}
          }
          else return current
        })
      })
    }
    }

    //DELETE OPERATION
    const deleteToDo=async(todoId)=>{
        const res=await fetch(`/api/todo/${todoId}`,{
            method:"DELETE"
        })
        const data =await res.json()
        if(data.acknowledged){
            setToDos((curentTodos)=>{
                return curentTodos.filter((current)=>
                (current._id!=todoId))
            })
        }
    }

  return (
    <div className="p-1 mx-3">
      <ul className="list-group border border-2 border-black ">
        <li className="list-group-item mytaskcard d-flex flex-wrap justify-content-between align-items-center p-1  ">
        <span  className={
                    'rounded-2' + (todo.progress==100 ? ' text-decoration-line-through text-muted' : '')
                  }>
          {todo.task}
        </span>
        <span> 
          <button className="btn purplebtn me-1 btn-sm" onClick={()=>updateToDo(todo._id,todo.status)}>
              {(todo.status) ? <input type="checkbox" defaultChecked /> : <input type="checkbox" /> }

             Click
        </button>
        <button className="btn btn-danger btn-sm" onClick={()=>deleteToDo(todo._id)}><FaTrash className="" /></button></span>
        </li>
       
        <li className="list-group-item mytaskcard">
          <form  className="d-flex align-items-center justify-content-center ">
            <input type="text" name="progress" placeholder="enter your progress in %" id=""  className="w-75 rounded-2" onChange={(e)=>{setMyprogress(e.target.value)}} />
          <button className="btn purplebtn ms-3 btn-sm " onClick={()=>updateProgress(todo._id,myprogress)}>progress</button>
          </form>
          <ProgressBar className="mt-3" animated now={todo.progress} label={`${todo.progress}%`} /></li>
        </ul>
    </div>

  
      

  )
}

export default ToDo