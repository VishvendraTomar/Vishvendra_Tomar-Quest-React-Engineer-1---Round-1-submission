import React, { useState } from 'react';

const AddTaskButton = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');


  return (
    <div className="add-card">
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={() => { onAddTask(newTask); setNewTask(''); }}>Add</button>
    </div>
  );
};

export default AddTaskButton;
