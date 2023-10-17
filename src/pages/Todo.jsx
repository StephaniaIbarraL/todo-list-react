import { useState,useRef } from "react";
import ListItem from "../components/ListItem";
import { v4 as uuidv4 } from "uuid";

function Todo (){

    // useState devuelve un array con dos cosas 
    // useState->[state, setState]
    const [todos, setTodos]= useState([]);
    const inputRef=useRef(null);

    //Add a new todo
    const addTodo=() => {
        const todoValue = inputRef.current.value;

        const newTodo= {name: todoValue, id: uuidv4()}

        console.log(todoValue);

        setTodos([newTodo, ...todos]);
        inputRef.current.value="";
    };

    const deleteTodo=(id) =>{
        // detete todo by id
        //filter items different to given id
        setTodos(todos.filter((item)=> item.id!== id ))


    }



    return (
        <div className="flex flex-col gap-2">
            <div  className="flex gap-2">
                <input ref={inputRef} type="text" className="bg-[444] rounded-md p-2 text-yellow-500" />
                <button onClick={addTodo} className="rounded-md bg-indigo-600 px-4 py-2" >Add todo</button>

            </div>
            <ul className="flex flex-col gap-2" >
                {
                    todos.map((item)=> {
                        return <ListItem key={item.id} text={item.name} onDelete={()=> deleteTodo(item.id)}/>
                    })
                }            
                
            </ul>
        </div>
    )
}

export default Todo;

