/* eslint-disable react/prop-types */
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Item({ id, children, className }) {
  const { isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grabbing",
    userSelect: "none",
    opacity: isDragging ? 0.5 : 1,
    width: "auto",
    height: "auto",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    backgroundColor: isDragging ? "#f0f0f0" : "white",
  };

  style.transition += ", background-color 150ms ease-in-out, box-shadow 150ms ease-in-out";

  return (
    <div className={className} key={id} ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  );
}
