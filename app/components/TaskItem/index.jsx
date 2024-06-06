import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="flex justify-between items-center p-2 bg-white rounded mb-2 shadow-md">
      <div className="flex items-center">
        <button 
          className="w-6 h-6 my-auto mr-4 focus:outline-none"
          onClick={() => onToggleTask(task.id)} 
        >
          {task.completed ? 
            <span className='text-blue-500 hover:text-gray-700'>Done</span> : 
            <span className='text-blue-500 hover:text-blue-700'>Not</span>
          }
        </button>
        <span className={`ml-2 ${task.completed ? 'line-through text-blue-500' : 'text-black'}`}>
          {task.text}
        </span>
      </div>
      <button onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
        <span>Delete</span>
      </button>
    </li>
  );
}
