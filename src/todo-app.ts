interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  completedOn?: Date;
}

enum TodoStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done",
}

const todoItems: Todo[] = [
  {
    id: 1,
    title: "Learn HTML",
    status: TodoStatus.Done,
    completedOn: new Date("2021-09-11"),
  },
  {
    id: 2,
    title: "Learn TypeScript",
    status: TodoStatus.InProgress,
  },
  {
    id: 3,
    title: "Learn ML",
    status: TodoStatus.Todo,
  },
];

function addTodoItem(todo) {
  const id = getNextId(todoItems);
  const newTodo = {
    id,
    title: todo,
    status: TodoStatus.Todo,
  };

  todoItems.push(newTodo);
}

function getNextId(items) {
  return items.reduce((max, x) => (x.id > max ? max : x.id), 0) + 1;
}

const newTodo = addTodoItem("Come back home");

console.log(todoItems)
