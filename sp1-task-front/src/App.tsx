import "./App.css";
import TaskSection from "./components/TaskSection";
import { TaskStatus } from "./types";

function App() {
  return (
    <>
      <div className="w-full text-center font-bold mt-1 text-xl">
        Kanban Board
      </div>
      <div className="flex justify-between mx-10 overflow-x-auto gap-4 mt-2 pb-2 scrollbar-main">
        {Object.values(TaskStatus).map((status) => (
          <TaskSection statusType={status} key={status} />
        ))}
      </div>
    </>
  );
}

export default App;
