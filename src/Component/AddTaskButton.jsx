import React, { useState } from 'react';

const AddTaskButton = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="add-card">
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => { onAddTask(newTask); setNewTask(''); }}>Add</button>
    </div>
  );
};

export default AddTaskButton;
