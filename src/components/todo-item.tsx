"use client";

import type { TodoItemData } from "@/types";
import Link from "next/link";
import style from "./todo-item.module.css";
import { completedTodoAction } from "@/actions/completed-todo.action";

export default function TodoItem({ id, name, isCompleted }: TodoItemData) {
  const handleToggle = async () => {
    await completedTodoAction(id, !isCompleted);
  };
  console.log(id, name, isCompleted);
  return (
    <div className={`${style.container} ${isCompleted ? style.completed : ""}`}>
      <button onClick={handleToggle} className={style.checkButton} />
      <Link href={`/items/${id}`} className={style.name}>
        {name}
      </Link>
    </div>
  );
}
