import { useState, useRef, useEffect, useReducer } from "react";
import ListItem from "../components/ListItem";
import { v4 as uuidv4 } from "uuid";


function reducer(state, action) {
  console.log(action, state);
  // ACTIONS
  switch (action.type){
    case 'ADD_TODO':
      // CODE...
      return{
        ... state,
        todos: [action.newTodo, ...state.todos],

      };
      default:
        throw new Error('That action type does not exist')
  }
}

const initialState={
  todos: [{name: "Hola mundo", id: 1, checked: false}],
  
}

function Todo() {
  //Use effect - sirve para usar efectos en nuestra pagina
  // useState devuelve un array con dos cosas - MANEJA EL ESTADO DE LAS APLICACIONES
  // useState->[state, setState] 
  const[state, dipatch]=useReducer(reducer, initialState);
  console.log(state)
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
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

  useEffect(() => {
    //check size of container
    console.log("useEffect", todos);
  }, [todos]);

  useEffect(() => {
    const getTodos = () => {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    };
    getTodos();
  }, []);

  //Add a new todo
  const addTodo = () => {
    const todoValue = inputRef.current.value;

    const newTodo = { name: todoValue, id: uuidv4(), checked:false };
    dipatch({type: 'ADD_TODO', newTodo})


    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    // detete todo by id
    //filter items different to given id
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="rounded-md bg-[444] p-2 text-black"
        />
        <button
          onClick={addTodo}
          className="rounded-md bg-indigo-600 px-4 py-2"
        >
          Add todo
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {state.todos.map((item) => {
          return (
            <ListItem
              key={item.id}
              text={item.name}
              onDelete={() => deleteTodo(item.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
