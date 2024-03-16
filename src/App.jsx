import React, { useState, useEffect } from 'react';
import './App.css';
import Heading from './Component/Heading';
import AddTaskButton from './Component/AddTaskButton';
import EditDescriptionModal from './Component/EditDescriptionModal ';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          todo: [
            {
              taskId: 1,
              taskName: 'sample task',
              description: 'sample description that you can edit ',
            },
           
          ],
          inProgress: [],
          review: [],
          done: [],
        };
  });

  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState(() => {
    const savedTaskId = localStorage.getItem('taskId');
    return savedTaskId ? parseInt(savedTaskId, 10) : 4;
  });

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskId', taskId);
  }, [taskId]);

  const moveTask = (taskIndex, source, destination) => {
    const taskToMove = tasks[source][taskIndex];
    setTasks((prevTasks) => ({
      ...prevTasks,
      [source]: prevTasks[source].filter((_, index) => index !== taskIndex),
      [destination]: [...prevTasks[destination], taskToMove],
    }));
  };

  const addNewTask = (taskName, destination) => {
    if (taskName.trim() !== '') {
      const updatedTask = {
        taskId: taskId,
        taskName: taskName,
        description: 'Task is the unit',
      };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [destination]: [...prevTasks[destination], updatedTask],
      }));
      setTaskId(taskId + 1);
    }
  };

  const openDescriptionModal = (taskId) => {
    setShowDescriptionModal(true);
    setCurrentTaskId(taskId);
    setDescriptionInput(tasks.todo.find((task) => task.taskId === taskId)?.description || '');
  };

  const closeDescriptionModal = () => {
    setShowDescriptionModal(false);
    setDescriptionInput('');
  };

  const saveDescription = (taskId, newDescription) => {
    const updatedTasks = tasks.todo.map((task) => {
      if (task.taskId === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: updatedTasks,
    }));
  };

 

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, targetColumn) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = tasks.todo.find((task) => task.taskId.toString() === taskId)
      ? 'todo'
      : tasks.inProgress.find((task) => task.taskId.toString() === taskId)
      ? 'inProgress'
      : tasks.review.find((task) => task.taskId.toString() === taskId)
      ? 'review'
      : 'done';

    if (sourceColumn !== targetColumn) {
      moveTask(
        tasks[sourceColumn].findIndex((task) => task.taskId.toString() === taskId),
        sourceColumn,
        targetColumn
      );
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Heading />
      <div className="Board">
        <div className="Column ToDo" onDrop={(e) => handleDrop(e, 'todo')} onDragOver={allowDrop}>
          <h2>To Do</h2>
          <div className="Cards">
            {tasks.todo.map((task, index) => (
              <div className="Card ToDo-Card" key={task.taskId}>
                <p>Task: {task.taskName}</p>
                <p>Description: {task.description}</p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    openDescriptionModal(task.taskId);
                  }}>+</button>
              </div>
            ))}
            <AddTaskButton onAddTask={(taskName) => addNewTask(taskName, 'todo')} />
          </div>
        </div>

        <div
          className="Column InProgress"
          onDrop={(e) => handleDrop(e, 'inProgress')}
          onDragOver={allowDrop}
        >
          <h2>In Progress</h2>
          <div className="Cards">
            {tasks.inProgress.map((task, index) => (
              <div
                className="Card InProgress-Card"
                key={task.taskId}
                draggable
                onDragStart={(e) => handleDragStart(e, task.taskId)}
                onClick={() => moveTask(index, 'inProgress', 'review')}
              >
                <p>Task: {task.taskName}</p>
                <p>Description: {task.description} </p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    openDescriptionModal(task.taskId);
                  }}>+</button>
                </div>
            ))}
          </div>
        </div>

        <div
          className="Column Review"
          onDrop={(e) => handleDrop(e, 'review')}
          onDragOver={allowDrop}
        >
          <h2>Review</h2>
          <div className="Cards">
            {tasks.review.map((task, index) => (
              <div
                className="Card Review-Card"
                key={task.taskId}
                draggable
                onDragStart={(e) => handleDragStart(e, task.taskId)}
                onClick={() => moveTask(index, 'review', 'done')}
              >
                <p>Task: {task.taskName}</p>
                <p>Description: {task.description}</p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    openDescriptionModal(task.taskId);
                  }}>+</button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="Column Done"
          onDrop={(e) => handleDrop(e, 'done')}
          onDragOver={allowDrop}
        >
          <h2>Done</h2>
          <div className="Cards">
            {tasks.done.map((task, index) => (
              <div
                className="Card Done-Card"
                key={task.taskId}
                draggable
                onDragStart={(e) => handleDragStart(e, task.taskId)}
                onClick={() => console.log('Click on Done')}
              >
                <p>Task: {task.taskName}</p>
                <p>Description: {task.description}</p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    openDescriptionModal(task.taskId);
                  }}>+</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditDescriptionModal
        isOpen={showDescriptionModal}
        onClose={closeDescriptionModal}
        taskId={currentTaskId}
        initialDescription={descriptionInput}
        onSave={saveDescription}
      />
    </div>
  );
};

export default App;
