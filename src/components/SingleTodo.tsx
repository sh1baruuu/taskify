import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Todo } from '../model';

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo: editTodo } : todo
            )
        );

        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`flex w-full items-center text-slate-800 text-sm bg-white-100 lg:h-14 h-10 rounded-md py-2 px-4 ${snapshot.draggingOver ? "opacity-50" : ""}`}
                    
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <input
                        type='checkbox'
                        name='isDone'
                        id='isDone'
                        checked={todo.isDone}
                        onChange={() => handleDone(todo.id)}
                        onClick={(e) => e.stopPropagation()}
                        className='mr-2'
                    />
                    {edit ? (
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className='bg-white-100 focus:outline-none w-full'
                        />
                    ) : (
                        <span
                            className={` focus:outline-none first-letter:uppercase ${
                                todo.isDone ? 'line-through' : ''
                            }`}
                        >
                            {todo.todo}
                        </span>
                    )}
                    <div className='text-slate-500 cursor-pointer flex ml-auto gap-2 items-center '>
                        <span
                            onClick={() => {
                                if (!todo.isDone) setEdit(!edit);
                            }}
                            className='hover:text-violet-700'
                        >
                            <AiFillEdit />
                        </span>
                        <span className='hover:text-red-600' onClick={() => handleDelete(todo.id)}>
                            <MdDelete />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;
