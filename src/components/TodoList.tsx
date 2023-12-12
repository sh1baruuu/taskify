import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
}) => {
    return (
        <div className='display flex md:flex-row flex-col md:w-11/12 w-full lg:gap-10 gap-5 pt-16 justify-center'>
            <Droppable droppableId='TodosList'>
                {(provided, snapshot) => (
                    <div
                    className={`flex flex-col items-center h-fit w-full p-4 border gap-3 border-white/20 bg-white/10 backdrop-blur-sm  rounded-md ${snapshot.isDraggingOver ? "shadow-bg" : ""}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                        <h2 className='font-title md:text-base text-md font-semibold tracking-wider text-white'>
                            Active Tasks
                        </h2>
                        {todos.map((todo, index) => {
                            return (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                    key={todo.id}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                    <div
                    className={`flex flex-col items-center h-fit w-full p-4 border gap-3 border-white/20 bg-white/10 backdrop-blur-sm rounded-md ${snapshot.isDraggingOver ? "shadow-bg" : ""}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                        <h2 className='font-title md:text-base text-md font-semibold tracking-wider text-white'>
                            Completed Tasks
                        </h2>
                        {completedTodos.map((todo, index) => {
                            return (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                    key={todo.id}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
