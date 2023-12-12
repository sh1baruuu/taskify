import { useState } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import Title from './components/Title';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
        }
        setTodo('');
    };

    const onDragEnd = (result: DropResult) => {
      const { destination, source } = result;
  
      if (!destination) {
        return;
      }
  
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
  
      let add;
      let active = todos;
      let complete = completedTodos;

      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
  
      if (destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
  
      setCompletedTodos(complete);
      setTodos(active);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <main className='flex flex-col min-h-screen lg:p-20 md:pt-10 md:px-5 p-3 overflow-hidden  items-center bg-gradient-to-br from-primary select-none to-secondary'>
                <Title />
                <InputField
                    todo={todo}
                    setTodo={setTodo}
                    handleAdd={handleAdd}
                />
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </main>
        </DragDropContext>
    );
};

export default App;
