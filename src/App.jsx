import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Checkbox,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!taskInput.trim()) {
      setError("Task description cannot be empty.");
      return;
    }

    const newTask = {
      id: Date.now(),
      description: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput(""); 
    setError("");
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        To-Do List
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={3}>
        <TextField
          variant="outlined"
          label="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
        >
          Add
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No tasks added yet.
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                backgroundColor: task.completed ? "#e0f7fa" : "#fff",
                mb: 1,
                borderRadius: 1,
                boxShadow: 1,
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <ListItemText
                primary={task.description}
                primaryTypographyProps={{
                  style: {
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#9e9e9e" : "#000",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};