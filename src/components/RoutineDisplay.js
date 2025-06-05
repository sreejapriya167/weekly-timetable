import React, { useState, useEffect } from 'react';
import './RoutineDisplay.css';

function RoutineDisplay({ day, routine, onAdd, onDelete, onBack }) {
  const [newTime, setNewTime] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newTasks, setNewTasks] = useState("");
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, index: null });

  const handleAdd = () => {
    if (!newTime || !newTitle || !newTasks) {
      alert("Please fill all fields");
      return;
    }

    const routineBlock = {
      time: newTime,
      title: newTitle,
      tasks: newTasks.split(",").map((task) => task.trim()),
    };

    onAdd(routineBlock);
    setNewTime("");
    setNewTitle("");
    setNewTasks("");
  };

  const handleEdit = (index) => {
    const block = routine[index];
    setNewTime(block.time);
    setNewTitle(block.title);
    setNewTasks(block.tasks.join(", "));
    onDelete(index);
    setContextMenu({ visible: false });
  };

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, index });
  };

  const handleClickOutside = () => {
    if (contextMenu.visible) setContextMenu({ visible: false });
  };

  // Add and clean up click event
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div className="routine-container">
      <button className="back-button" onClick={onBack}>← Back</button>

      {routine?.map((block, index) => (
        <div
          key={index}
          className="routine-item"
          onContextMenu={(e) => handleRightClick(e, index)}
        >
          <h3 className="routine-time">{block.time} - {block.title}</h3>
          <ul className="routine-tasks">
            {block.tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      ))}

      {contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li onClick={() => handleEdit(contextMenu.index)}>✏️ Edit</li>
          <li onClick={() => {
            onDelete(contextMenu.index);
            setContextMenu({ visible: false });
          }}>🗑️ Delete</li>
        </ul>
      )}

      <hr />
      <h3>Add New Routine Block</h3>
      <form className="routine-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Time (e.g., 6:30 AM)"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title (e.g., Workout)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tasks (comma-separated)"
          value={newTasks}
          onChange={(e) => setNewTasks(e.target.value)}
        />
        <button className="fade-button" onClick={handleAdd}>➕ Add Routine</button>
      </form>
    </div>
  );
}

export default RoutineDisplay;
