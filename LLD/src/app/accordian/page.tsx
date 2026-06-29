"use client";
import { useState } from "react";
import Accordian from "./accordian";

const data = [
  {
    id: 1,
    title: "What is an Accordion?",
    content:
      "An accordion is a UI component that lets users expand and collapse sections of content, showing only what they need at a time.",
  },
  {
    id: 2,
    title: "When should I use it?",
    content:
      "Use accordions to organize large amounts of content into compact, manageable sections like FAQs, settings, or product details.",
  },
  {
    id: 3,
    title: "Is it accessible?",
    content:
      "Yes, when built correctly with proper ARIA attributes and keyboard support, accordions are fully accessible to all users.",
  },
  {
    id: 4,
    title: "Can multiple sections stay open?",
    content:
      "It depends on the design. Some accordions allow only one open section at a time, while others permit multiple sections to be expanded.",
  },
  {
    id: 5,
    title: "How is it different from tabs?",
    content:
      "Tabs show one panel at a time horizontally, while accordions stack vertically and can reveal content inline below each header.",
  },
];

function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {data.map((item, index) => (
        <Accordian
          isOpen={openIndex === index}
          setIsOpen={() =>
            openIndex === index ? setOpenIndex(null) : setOpenIndex(index)
          }
          key={item.id}
          title={item.title}
          content={item.content}
        ></Accordian>
      ))}
    </div>
  );
}

export default Page;
