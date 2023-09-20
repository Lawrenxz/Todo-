import "./App.css";
import CustomButton from "./component/CustomButton";
import CustomInput from "./component/CustomInput";
import useTodo from "./hooks/useTodo";
import useTodoStore from "./zustand/store";

function App() {
  const {
    addTodo,
    handleOnchange,
    newTodo,
    selectedTodos,
    handleTodoSelect,
    markTodo,
    deleteTodo,
    bulkMarkTodo,
    bulkDeleteTodo,
  } = useTodo();

  const { todoList } = useTodoStore();

  console.log(todoList);
  return (
    <div className="flex flex-col w-full border">
      <form onSubmit={addTodo}>
        <div className=" flex flex-row justify-center items-start gap-2   ">
          <CustomInput
            value={newTodo}
            name="myTodo"
            type="text"
            placeHolder="What am i going to do"
            onChange={(value) => handleOnchange(value)}
          />
          <CustomButton title="Add Todo" type="submit" />
        </div>
      </form>

      {selectedTodos.length > 0 && (
        <div className="flex flex-row gap-2 mt-5">
          <CustomButton
            onClick={() => bulkDeleteTodo()}
            title="Delete all checked"
          />
          <CustomButton
            onClick={() => bulkMarkTodo()}
            title=" Mark as complete all checked"
          />
        </div>
      )}

      <div className="mt-5">
        {todoList.info.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-center",
              marginTop: 1,
            }}
          >
            <div className="flex-1 flex flex-row items-center gap-2 justify-start">
              <input
                type="checkbox"
                onChange={() => handleTodoSelect(todo.id)}
                checked={selectedTodos.includes(todo.id)}
              />
              <h3 className="text-center">{todo.title}</h3>
            </div>
            <div className="flex flex-row gap-2">
              {todo.status !== "Completed" && (
                <CustomButton
                  title="Complete"
                  onClick={() => markTodo(todo.id)}
                />
              )}
              <CustomButton
                title="Delete"
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
