import TodoInput from "@/components/todo-input";
import style from "./page.module.css";
import EmptyState from "@/components/emptystate";
import TodoItem from "@/components/todo-item";
import { TodoItemData } from "@/types";

async function GetTodos() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch todo items");
  }

  const allTodos: TodoItemData[] = await response.json();

  const todoList = allTodos.filter((item) => !item.isCompleted);
  const doneList = allTodos.filter((item) => item.isCompleted);

  return (
    <div className={style.listContainer}>
      <section className={style.todo}>
        <h2 />
        {todoList.length === 0 ? (
          <EmptyState
            imageSrc="/imgs/todoImg.png"
            comment={"할 일이 없어요. \nTODO를 새롭게 추가해주세요!"}
          />
        ) : (
          todoList.map((item) => <TodoItem key={item.id} {...item} />)
        )}
      </section>
      <section className={style.done}>
        <h2 />
        {doneList.length === 0 ? (
          <EmptyState
            imageSrc="/imgs/doneImg.png"
            comment={"아직 다 한 일이 없어요. \n해야 할 일을 체크해보세요!"}
          />
        ) : (
          doneList.map((item) => <TodoItem key={item.id} {...item} />)
        )}
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <TodoInput />
      <GetTodos />
    </div>
  );
}
