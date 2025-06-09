import { TodoContainer } from "./components/TodoContainer/TodoContainer";
import { TodoProvider } from "./context/TodoProvider";
import "./App.css";

function App() {
  return (
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>
  );
}

export default App;