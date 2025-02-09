import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estado para armazenar as tarefas
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Função para adicionar uma tarefa
  const addTask = () => {
    if (task) {
      const newTask = {
        text: task,
        completed: false, // Adicionando o status de tarefa concluída
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask(""); // Limpa o campo de input após adicionar a tarefa
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  // Função para remover uma tarefa
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  // Função para alternar o estado de "concluída" de uma tarefa
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Função para salvar as tarefas no localStorage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Função para carregar as tarefas do localStorage quando o app for iniciado
  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  };

  // Usando useEffect para carregar as tarefas do localStorage ao iniciar o app
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? "Desmarcar" : "Concluir"}
            </button>
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
