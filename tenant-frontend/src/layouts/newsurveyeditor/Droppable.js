/* eslint-disable react/prop-types */
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    border: isOver ? "2px solid green" : "2px dashed gray",
    height: "50px",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
