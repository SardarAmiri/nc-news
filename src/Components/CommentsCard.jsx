
import { AiOutlineDelete } from "react-icons/ai";
export default function CommentsCard({comment}) {
  return (
    <section id="commentCard"> 
        <div id="flex">
            <div id="author">🤵@{comment.author}</div>
            <div id="date">{comment.created_at}</div>
        </div>
        <div id="body">{comment.body}</div>
        <button id="delete">{<AiOutlineDelete />}</button>
    </section>
  )
}
