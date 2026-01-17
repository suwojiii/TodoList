import Image from "next/image";
import style from "./emptystate.module.css";

export default function EmptyState({
  imageSrc,
  comment,
}: {
  imageSrc: string;
  comment: string;
}) {
  return (

    <div className={style.container}>
      <Image src={imageSrc} alt="" width={240} height={240} priority />
      <p className={style.coment}>{comment}</p>
    </div>
  );
}
