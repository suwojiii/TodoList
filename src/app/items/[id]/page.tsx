import { TodoDetail } from "@/components/todo-detail";
import { TodoItemData } from "@/types";
import { notFound } from "next/navigation";

async function GetTodo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다 ...</div>;
  }

  const todo: TodoItemData = await response.json();

  return (
    <>
      <TodoDetail {...todo} />
    </>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <GetTodo params={params} />
    </>
  );
}
