import { useState, useEffect } from "react";

function ToDoList(){

    const [tasks, setTasks] = useState(() => {
        // Retrieve tasks from localStorage when the component loads
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [currentTask, setCurrentTask] = useState("");

    // Save tasks to localStorage whenever the tasks array changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInput(event){
        setCurrentTask(event.target.value); 
    }

    function addTask() {
        if (currentTask.trim() !== "") {
            setTasks([...tasks, { text: currentTask, isCompleted: false }]); // Add a task object
            setCurrentTask("");
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, isCompleted: !task.isCompleted }; // Toggle isCompleted
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(index){
        const updatesTasks = tasks.filter((_, i) => (i !== index));
        setTasks(updatesTasks);
    }
    return(
        <div className="list-container">
            <h1>To-Do List</h1>
        <div className="input-container">
            <input onChange={handleInput} type="text" placeholder="Enter task..." value={currentTask} />
            <button className="add-btn" onClick={addTask}>Add</button>
        </div>
            
        
            <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            
                            <span className="text"
                                style={{
                                    textDecoration: task.isCompleted ? "line-through" : "none",
                                }}
                            >
                                {task.text}
                            </span>
                            <button className="check-off" onClick={() => toggleTaskCompletion(index)}>
                            {task.isCompleted ? "🔄" : "✅"}
                            </button>
                            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                        </li>
                    ))}
            </ol>
       
        
        </div>
    );
}
export default ToDoList

