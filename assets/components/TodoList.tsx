import { useState } from 'react';
import TodoItem from './TodoItem.tsx';

const TodoList = () => {
  const [tasks, setTasks] = useState<Array<{id: number, text: string, completed: boolean}>>([
    {
      id: 1,
      text: '降妖除魔',
      completed: false,
    },
    {
      id: 2,
      text: '找镇妖拘魂铃',
      completed: true,
    },
  ]);

  const [text, setText] = useState('');

  const addTask = (text: string): void => {
    const newTask: { id: number; text: string; completed: boolean } = {
      id: Date.now(),
      text,
      completed: false,
    };
    if (text.trim().length) {
      setTasks([...tasks, newTask]);
      setText('');
    }
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = (id: number): void => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    }));
  };

  return (
    <div className="todo-list">
      <div className="add-todo mb-5">
        <input className="p-2 border rounded-s-lg dark:text-black"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="p-2 border border-l-0 rounded-e-lg" onClick={() => addTask(text)}>Add</button>
      </div>

      <div className="tasks">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </div>
    </div>
  );
};
export default TodoList;
