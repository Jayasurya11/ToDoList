import { useState,useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css'
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// const initialTodos=[
//   {id: crypto.randomUUID(), text:"create quiz app on my own", completed:false },
//   {id: crypto.randomUUID(), text:"message vintern", completed:false },
//   {id: crypto.randomUUID(), text:"welovedaily add more style", completed:false },
//   {id: crypto.randomUUID(), text:"read book ", completed:false},
// ]

function App() {
  const [todo, setTodo] = useState([]);
  const [textValue,setText]=useState("");
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);
  function Delete(idx){
    setTodo((todo)=>{
      return todo.filter((t)=>{
        return t.id!=idx;
      })
    })
  }
  function Update(){
    setTodo((t)=>{
      return ([...t ,{id: crypto.randomUUID(),text:textValue,completed:false}])
    })
    
  }
  function handleChange(e){
    setText(e.target.value)
  }
  function handleSubmit(event){
    event.preventDefault();
    Update();
    setText("")
   
    
  }
  const handleCheckBox=(idx)=>{
    setTodo((todo)=>{
      return todo.map((t)=>{
        if(t.id==idx){
          const a={...t}
          a.completed=(a.completed?false:true);
          return a
        }
        else{
          return t
        }
      })
    })
  }
  return (
    <>
    <div className="todoBox">
      <div className="lists" >
      <h1>Todos</h1>
        {todo.map((t)=>{
          return <li key={t.id}><FormGroup>
          <FormControlLabel className="changeDisplay" control={<Checkbox onChange={()=>(handleCheckBox(t.id))}/>} label={t.text} />
          
          </FormGroup>
          <IconButton className="changeDisplay delete" onClick={()=>{Delete(t.id)}}  key={crypto.randomUUID()}><DeleteIcon /></IconButton>
            
            
          </li>
        })}
        <form className="form" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Add a todo" variant="outlined" value={textValue} onChange={ handleChange} 
        
        />
        <IconButton type="submit">< SendIcon/></IconButton>
        </form>
        
      
    </div>
    
    <div className="completed">
  
    <h1>Completed</h1>
    
    {todo.map((t)=>{
      return ((t.completed)?<li>{t.text}</li>:null) 
    })}
    </div>
  </div>
    </>
  )
}
export default App
