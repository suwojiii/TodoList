"use server";

import { revalidatePath } from "next/cache";
import type { TodoItemData } from "@/types";

export async function editTodoAction(todo: TodoItemData) {
  const name = todo.name?.trim();

  if (!name) {
    return { status: false, error: "할 일을 입력해주세요." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${todo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          memo: (todo.memo ?? "").toString(),
          imageUrl: todo.imageUrl || null,
          isCompleted: todo.isCompleted,
        }),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        status: false,
        error: data?.message
          ? `수정에 실패했습니다: ${data.message}`
          : `수정에 실패했습니다: ${response.statusText}`,
      };
    }

    revalidatePath(`/items/${todo.id}`);
    return { status: true };
  } catch (err) {
    return {
      status: false,
      error: `Todo 수정에 실패했습니다: ${err}`,
    };
  }
}
