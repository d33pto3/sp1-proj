import { FC, useEffect, useState } from "react";
import { selectColorByStatus } from "../utils";
import TaskCard from "./TaskCard";

interface TaskSectionProps {
  statusType: string;
}

const TaskSection: FC<TaskSectionProps> = ({ statusType }) => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const statusColor = selectColorByStatus(statusType);

  const getData = async () => {
    setLoading(true);
    const url = "http://localhost:8000/files";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response?.status}`);
      }

      const data = await response.json();
      setCount(data?.count);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex-shrink-0 bg-slate-100 overflow-y-auto max-h-[calc(100vh-80px)] min-h-64 h-[100%] scrollbar-secondary min-w-[325px]">
        <div className="flex justify-between px-[10px] pt-4 text-[#66647A] font-semibold">
          {/* section title and color */}
          <div className="flex justify-start items-center gap-2">
            {statusColor !== "none" && (
              <div className={`${statusColor} h-5 w-5 rounded-l-full`} />
            )}
            <h3>{statusType}</h3>
          </div>
          <p className="bg-slate-200 px-2">0</p>
        </div>
        <div className="pt-24 text-center text-xl font-bold text-[#1F1F1F]">
          loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 bg-slate-100 overflow-y-auto max-h-[calc(100vh-80px)] min-h-64 h-[100%] scrollbar-secondary">
      {/* section header */}
      <div className="flex justify-between px-[10px] pt-4 text-[#66647A] font-semibold">
        {/* section title and color */}
        <div className="flex justify-start items-center gap-2">
          {statusColor !== "none" && (
            <div className={`${statusColor} h-5 w-5 rounded-l-full`} />
          )}
          <h3>{statusType}</h3>
        </div>
        <p className="bg-slate-200 px-2">0</p>
      </div>

      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
      <TaskCard count={count} setCount={setCount} />
    </div>
  );
};

export default TaskSection;
