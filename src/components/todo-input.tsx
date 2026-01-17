"use client";

import { useActionState, useEffect } from "react";
import style from "./todo-input.module.css";
import { createTodoAction } from "@/actions/create-todo.action";

export default function TodoInput() {
  const [state, formAction, isPending] = useActionState(createTodoAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.container} action={formAction}>
        <input
          disabled={isPending}
          required
          name="name"
          placeholder="할 일을 입력해주세요"
        />
        <button disabled={isPending} type="submit">
          +
        </button>
      </form>
    </section>
  );
}
