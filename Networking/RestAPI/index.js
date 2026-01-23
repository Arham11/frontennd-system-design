import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5111;

app.use(bodyParser.json());
app.all("/", (req, res) => {
  //   console.log(req);
  //   console.log(res);
  res.send(`I am up`);
});

let todos = [
  {
    id: 1,
    title: "task 1",
    status: false,
  },
  {
    id: 2,
    title: "task 2",
    status: true,
  },
  {
    id: 3,
    title: "task 3",
    status: false,
  },
];

// read
app.get("/todos", (req, res) => {
  res.json(todos);
});

// create
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({ message: "new todo added successfully!" });
});

// update
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = Number(req.params.id);

  let todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
  }
  res.json({ message: "todo updated successfully!!!" });
});

// delete
app.delete("/todos/:id", (req, res) => {
  const todoParamId = Number(req.params.id);
  let todoIndex = todos.findIndex((td) => td.id === todoParamId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  res.json({ message: "deleted successfully", itemDeleted: todoIndex });
});

app.listen(PORT, () => {
  console.log(`Server is Running at Port ${PORT}`);
});
