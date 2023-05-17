/* eslint-disable react/prop-types */
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, id, hovered }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    border: isOver || hovered ? "2px solid green" : null,
    height: "50px",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
