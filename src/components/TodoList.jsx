import PropTypes from "prop-types";
import TodoItem from "./TodoItem.jsx";

function TodoList({todos, handleDeleteTodo, handleChangeStatus}) {
    return (
        <ul className="todos-list">
            {todos.map((task) => (
                <TodoItem
                    key={task.id}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTodo={handleDeleteTodo}
                    task={task}
                />
            ))}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleChangeStatus: PropTypes.func.isRequired
}

export default TodoList;