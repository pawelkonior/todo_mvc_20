import './App.scss';
import {getId} from "./helpers/helpers.js";
import {Headline} from "./components/Headline.jsx";
import TodoAdd from "./components/TodoAdd.jsx";
import TodoList from "./components/TodoList.jsx";
import Counter from "./components/Counter.jsx";
import {DeleteAllBtn} from "./components/DeleteAllBtn.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import {useState} from "react";


function App() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useLocalStorage('tasks');

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