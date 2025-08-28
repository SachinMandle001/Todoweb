import { useEffect,useState } from "react"
import ToDo from './ToDo';
import Card from 'react-bootstrap/Card';
import "./App.css"

const App = () => {

const [todos, setToDos] = useState([])
const [content, setContent] = useState('')

useEffect(() => {
  const getToDos = async()=>{
    try {
      const response=await fetch('https://sachin-todowebapp-backend.onrender.com/api/todo')
       if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setToDos(json);
        console.log(json);
      
    } catch (error) {
      console.error("error fetching todos",error)
    }
  }
  getToDos()

}, [])

const createToDo =async(e)=>{
  e.preventDefault();
  try {
      const res = await fetch('https://sachin-todowebapp-backend.onrender.com/api/todo', {
        method: "POST",
        body: JSON.stringify({ task: content }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to create todo");
      const data = await res.json();
      setContent('');
      setToDos([...todos, data]); 
    } catch (error) {
      console.error("Error creating todo:", error);
    }
}


  return (
  <>
  <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center ">
          <Card style={{ width: '30rem' }} className="mybgcard shadow-lg rounded-4 ">
            <Card.Body className=" text-dark py-4 px-0">
              <h1 className='text-center  p-3'>ToDos List</h1> 
    <form  onSubmit={createToDo} className="d-flex gap-2 flex-wrap justify-content-center pb-3" >
    <input type="text" className=" rounded-2 p-1 ps-2" placeholder='Enter new to do here ' value={content} onChange={(e)=>setContent(e.target.value)} required />
    <button className="btn btn-primary border border-2 border-black">Create Todo</button>
    </form>
    {todos.map((todo) => (
        <ToDo todo={todo} key={todo._id} setToDos={setToDos} /> 
      ))}

          </Card.Body>
          </Card>
        </div>
      </div>
  </>
  
)
}
export default App