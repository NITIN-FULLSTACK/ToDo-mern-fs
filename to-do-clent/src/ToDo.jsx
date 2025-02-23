


import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ToDo = () => {

const [title,setTitle]=useState("")
const [description,setDescription] =useState("")
const [todos,setTodos] = useState([])
const [message,setMessage] = useState("")
const [error,setError] = useState("")
const apiUrl  = 'http://localhost:8000/'
const [edit,setEdit]=useState(-1)

const [edittitle,setEditTitle]=useState("")
const [editdescription,setEditDescription] =useState("")


const  handleSummit= () =>{
   setError("")
    if(title.trim() !=='' && description.trim() !=='' ){
    axios.post(apiUrl + 'todos',{
        title,description
    }).then((res)=>{
        setTodos([...todos,{title,description}])
        setMessage('the code is done and add one todo')
        setTimeout(()=>{
            setMessage("")
        },2000)
        setTitle("")
        setDescription("")
    }).catch((err)=>{
        setError("the code is not define "+err)
        setTimeout(()=>{
            setError("")
        },3000)
        
    })
  } 
}

useEffect(()=>{
    getItems()
},[])
    const getItems =()=>{
        axios.get(apiUrl+"todos")
        .then((res)=>{
            setTodos(res.data)
        })
    }

    const handleEdit =(item) =>{
        setEdit(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description)
    }
  const handleUpdate = ()=>{
    if(edittitle.trim() !=='' && editdescription.trim() !=='' ){
    

        axios.put(apiUrl + 'todos/'+edit,{
            title:edittitle,description:editdescription
        }).then((res)=>{
       const updateTodo = todos.map((item)=>{
                if(item._id == edit){
                    item.title= edittitle
                    item.description =editdescription
                }
                return item
            })
            setTodos(updateTodo)
            setMessage('UPDATED SUCCERFULLY')
            setTimeout(()=>{
                setMessage("")
            },2000)
            setEdit(-1)
        }).catch((err)=>{
            setError("the code is not define "+err)
            setTimeout(()=>{
                setError("")
            },3000)
        })
      } 
  }
  const  handleEditCancel=() =>{
    setEdit(-1)
  }
  const handelDelete =(id)=>{
    if (confirm("are u confiim to delete")) {
        axios.delete(apiUrl+'todos/'+id).then(()=>{
         const updatedTodo =   todos.filter((item)=>item._id !== id)
            setTodos(updatedTodo)
        setEditTitle("")
        setEditDescription("")
        
        })

    }
  }
  return (
    <>
        <div><h2>ToDo app list </h2></div>
        <div>
            <h2>Add item</h2>
            { message && <p>{message}</p>}
            <div>

                <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='enter ur title' />
                <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='description'/>
                <button onClick={handleSummit} >Summit</button>
            </div>
            {error && <p>{error}</p>} 
            
        </div>
        <div>
            <h3>Tasks</h3>
            
           
              {
                todos.map((item)=>
                    <ul>
                <li>
               
               {
                edit == -1 || edit !== item._id ? <>
                <span> {item.title} </span>
                <br />
                <span> {item.description} </span>
                </>: <>
                 <div>
                 <input type="text" onChange={(e)=>setEditTitle(e.target.value)} value={edittitle} placeholder='enter ur title' />
                <input type="text" onChange={(e)=>setEditDescription(e.target.value)} value={editdescription} placeholder='description'/>
                
                 </div>
                </> 
               }
                {
                    edit == -1  ? <button onClick={()=>handleEdit(item)}>Edit</button> : <button onClick={handleUpdate} > Update</button>
                }
                
               {edit == -1 ?<button onClick={()=>handelDelete(item._id)} >delete</button> :
                <button onClick={handleEditCancel}>cancle</button>}
               </li>
               </ul>)
              }
                
            
        </div>
    </>
  )
}

export default ToDo
