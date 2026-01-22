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

const todos = [
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

// delete

app.listen(PORT, () => {
  console.log(`Server is Running at Port ${PORT}`);
});
