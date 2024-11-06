import { FC, useState } from "react";
import { IoLayers } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { PiChatsTeardropThin } from "react-icons/pi";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";
import Modal from "./Modal";

interface TaskCardProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const TaskCard: FC<TaskCardProps> = ({ count, setCount }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mx-2 px-2 bg-white mt-4 rounded-sm">
      {/* Card top */}
      <div className="pt-2 flex justify-between">
        {/* Top Left */}
        <div className="flex items-center gap-1 text-sm font-semibold text-[#5A6181]">
          <img
            className="bg-yellow-400 rounded-full h-6"
            src="/src/assets/user-avatar-1-32.png"
          />
          <p>Client Name</p>
        </div>

        {/* Top Right */}
        <div className="flex items-center gap-1 text-sm font-semibold text-[#5A6181]">
          <img
            className="bg-cyan-400 rounded-full h-6"
            src="/src/assets/user-avatar-2-32.png"
          />
          <p>Rakin Farhan</p>
        </div>
      </div>

      {/* Card mid */}
      <div className="flex justify-between mt-2">
        {/* Mid Left */}
        <div className="flex justify-between items-center text-[13px] text-[#5A6181]">
          <div className="flex items-center gap-2">
            <IoLayers size={16} />
            <p>Lorem ipsum dolor sit amet curn...</p>
          </div>
          <p></p>
        </div>
        {/* Mid Right */}
        <div className="flex items-center gap-1 text-[#5A6181] bg-[#F2F4F7] text-sm font-semibold px-[2px] py-[4px] rounded-sm">
          <FaClipboardList />
          <p>1/2</p>
        </div>
      </div>

      {/* card bottom */}
      <div className="flex justify-start items-center gap-3 pb-2 text-[#5A6181] my-2 text-[13px]">
        <img
          className="bg-cyan-400 rounded-full h-6"
          src="/src/assets/user-avatar-2-32.png"
        />
        <img
          className="bg-cyan-400 rounded-full h-6"
          src="/src/assets/user-avatar-2-32.png"
        />
        <p className="bg-[#F2F4F7] rounded-full p-[4px] text-[#333333] font-semibold">
          12+
        </p>
        <div className="flex items-center text-[#666666] text-sm font-semibold gap-1">
          <PiChatsTeardropThin size={16} />
          <p>15</p>
        </div>
        <div className="flex items-center text-[#666666] text-sm font-semibold gap-1">
          <button className="group relative">
            <GrAttachment size={16} onClick={openModal} />
            <div className="absolute left-[50%] transform -translate-x-1/2 bottom-8 bg-slate-600 text-white text-xs rounded-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max whitespace-nowrap">
              Upload Files
            </div>
          </button>
          <p>{count}</p>
        </div>
        <div className="flex items-center text-[#666666] text-xs font-bold gap-1">
          <FaRegCalendarDays size={12} />
          <p>30-12-2022</p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} setCount={setCount} />
    </div>
  );
};

export default TaskCard;
