"use client";

interface IAccordianProps {
  title: string;
  content: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

function Accordian({
  title,
  content,
  isOpen,
  setIsOpen,
}: Readonly<IAccordianProps>) {
  return (
    <div className="w-1/2 mx-auto mb-2">
      <button
        className="bg-gray-400 text-black p-2 w-full text-left cursor-pointer"
        onClick={setIsOpen}
      >
        <span>{title}</span>
      </button>
      {isOpen && <div className="p-2.5">{content}</div>}
    </div>
  );
}

export default Accordian;
