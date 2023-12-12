import { useRef } from 'react';
import { IoMdAdd } from "react-icons/io";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className='relative lg:w-6/12 md:w-8/12 w-full'
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur()
            }}
        >
            <input
                ref={inputRef}
                type='text'
                placeholder='Create new task'
                value={todo}
                id='todo'
                onChange={(e) => setTodo(e.target.value)}
                className='w-full rounded-md text-sm shadow-inset focus:shadow-bg h-10 pl-10 pr-4 focus:outline-none'
            />
            <HiMiniBars3BottomLeft className='absolute top-2/4 translate-y-[-50%] text-slate-700 left-3' />
            <button
                className='absolute grid place-items-center top-2/4 translate-y-[-50%] shadow-md active:scale-90 duration-100 right-1 bg-primary text-white rounded-md h-8 w-8'
            ><IoMdAdd /></button>
        </form>
    );
};

export default InputField;
