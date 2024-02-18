import Todo from "@/models/todo.models";

const todoResolvers = {
  Query: {
    todo: async (parent, { id }) => {
      try {
        if (id === "") {
          return new Error("todo Id are required!");
        }
        const todo = await Todo.findById(id);
        if (!todo) {
          return new Error("todo are not found!");
        }
        return todo;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    getTodos: async (parent, args) => {
      try {
        const todos = await Todo.find();
        return todos;
      } catch (error) {
        console.log(error);
        throw new Error("error from server");
      }
    },
  },
  Mutation: {
    createTodo: async (parent, args) => {
      try {
        const { name, content } = args;

        if (!(name && content)) {
          return new Error("must need name with content");
        }
        if (name === "" || content === "") {
          return new Error("all field are require");
        }

        const todo = new Todo({
          name,
          content,
        });

        await todo.save();

        return todo;
      } catch (error) {
        console.log(error);
        throw new Error("error from server");
      }
    },
  },
};

export default todoResolvers;
