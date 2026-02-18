import { FC } from 'react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ task, deleteTask, toggleCompleted }) => {
  const handleChange = (): void => {
    toggleCompleted(task.id);
  };

  return (
    <div className="flex mb-5">
      <input
        className='border py-3 mr-5'
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
      />
      <p className={task.completed ? 'line-through' : ''}>{task.text}</p>

      {task.completed && (
        <button className='border px-2 ml-5' onClick={() => deleteTask(task.id)}>X</button>
      )}
    </div>
  );
};

export default TodoItem;
