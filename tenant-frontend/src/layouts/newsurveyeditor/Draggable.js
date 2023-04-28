/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable({ id, children, setState }) {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "pointer",
        zIndex: isDragging ? 5 : 0,
      }
    : undefined;

  const toggleDrawer = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      right: false,
    }));
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    toggleDrawer();
  }, [toggleDrawer]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}
