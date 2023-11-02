import './App.scss';
import {useEffect, useState} from "react";
import {getId} from "./helpers/helpers.js";
import {Headline} from "./components/Headline.jsx";
import TodoAdd from "./components/TodoAdd.jsx";
import TodoList from "./components/TodoList.jsx";
import Counter from "./components/Counter.jsx";
import {DeleteAllBtn} from "./components/DeleteAllBtn.jsx";


function App() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(getFromLocalStorage());

    useEffect(() => {
        updateLocalStorage(todos);
    }, [todos]);


    const handleAddTodo = (evt) => {
        if (evt.key === "Enter" && todo.trim().length >= 3) {
            setTodos([{
                id: getId(todos),
                status: 'in progress',
                title: todo
            }, ...todos]);
            setTodo('');
        }
    };

    const handleChangeStatus = (task) => {
        task.status = task.status === 'in progress' ? 'done' : 'in progress';
        setTodos([...todos]);
    };

    const handleDeleteTodo = (todo) => {
        setTodos(todos.filter((task) => task !== todo));
    };

    const handleDeleteDoneTasks = () => {
        setTodos(todos.filter((task) => task.status !== 'done'));
    };

    const updateLocalStorage = (data) => {
        localStorage.setItem('todos', JSON.stringify(data));
    }

    function getFromLocalStorage() {
        const data = localStorage.getItem('todos');
        if (data !== null) {
            return JSON.parse(data);
        }
        return [];
    }

    return (
        <div className="todoapp">
            <Headline/>
            <section className="todos">
                <TodoAdd
                    todo={todo}
                    setTodo={setTodo}
                    addTodo={handleAddTodo}
                />
                <TodoList
                    todos={todos}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTodo={handleDeleteTodo}
                />

                <div className="box">
                    <Counter todos={todos}/>
                    {todos.some((task) => task.status === 'done') && (
                        <DeleteAllBtn handleDeleteDoneTasks={handleDeleteDoneTasks}/>
                    )}
                </div>
            </section>
        </div>
    );
}

export default App;