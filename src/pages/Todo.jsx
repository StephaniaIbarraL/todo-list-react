import { useState,useRef, useEffect } from "react";
import ListItem from "../components/ListItem";
import { v4 as uuidv4 } from "uuid";

function Todo (){
    //Use effect - sirve para usar efectos en nuestra pagina 
    // useState devuelve un array con dos cosas 
    // useState->[state, setState]
    const [todos, setTodos]= useState([]);
    const inputRef=useRef(null);
/*
    //DependencyList is null exec once
    //cuando la dependencia esta vacia se ejecuta solo una vez
    useEffect(()=> {
        //fetch api
        //initializate connection
        console.log("useEffect");
    },[]);
*/

/*
    //without DependencyList exec each time state changes
    useEffect(()=> {
        //check size of container
        console.log("useEffect");
    },[]);
*/

    useEffect(()=> {
        //check size of container
        console.log("useEffect", todos);
    },[todos]);

    //Add a new todo
    const addTodo=() => {
        const todoValue = inputRef.current.value;

        const newTodo= {name: todoValue, id: uuidv4()}

        console.log(todoValue);

        console.log("before", todos);

        setTodos([newTodo, ...todos]);

        console.log("after", todos);

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
                <input ref={inputRef} type="text" className="bg-[444] rounded-md p-2 text-black" />
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

