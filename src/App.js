import { useEffect, useState } from "react";

function App() {
  return <Todos />;
}

function Todos() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const url = 'https://jsonplaceholder.typicode.com/todos';

  async function fetchTodos {
    //fetch the data from the API
    try {
      const response = await fetch(url);

      if(!response.ok) {
        throw new Error('HTTP error! Status: ${response.status}');
      }

      const data = await response.json();
      
    }
    catch (error) {
      console.log('Error fetching data:', error)
    }

    //assign fetched data to local list
    const todoTitles = data.map(todo => todo.title);
    setTodos(todoTitles);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter was pressed...");
      if (inputValue.trim() !== "") {
        console.log("Adding TODO");
        setTodos([...todos, inputValue]);
        setInputValue("");
        setCount(count + 1);
      }
    }
  };

  const deleteTodo = (index) => {
    console.log("Delete Section - TODOS", todos);
    console.log("Removing TODOs");
    const newTodos = todos.filter(
      (todo, currentIndex) => currentIndex !== index
    );
    console.log("");
    console.log("newTODOS", newTodos);
    setTodos(newTodos);
    setCount(newTodos.length);
  };

  useEffect(() => {
    fetchTodos();
  }, [count, todos]);

  return (
    <div className="todo-component">
      <div>
        <h1 className="todo-header">todos</h1>
      </div>
      <div className="todo-container">
        <div>
          <input
            className="todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
        </div>
        <div>
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <div key={index} className="todo-item">
                <li>{todo}</li>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <p className="item-count">{count} items left</p>
        </div>
      </div>
    </div>
  );
}

export default App;
