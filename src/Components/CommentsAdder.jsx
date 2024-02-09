import fetchApi from "./fetchApi"
import { useState} from "react"
function CommentsAdder({id, setComments }) {
    const [addComment, setAddComment] = useState('')
    function handleAddComment (e){
    e.preventDefault()
    setAddComment('')
    

const newComment = {
    username: 'cooljmessy',
    body: addComment,
}
  fetchApi().post(`/api/articles/${id}/comments`, newComment)
    setComments((currentComment) => {
        return [newComment, ...currentComment]
    })
    setAddComment('')
  }
  return (

    <form onSubmit={handleAddComment} id="comment-form">
        <label htmlFor="input"></label>
        <input type="text" 
        placeholder="Add a comments..."
        id="input"
        value={addComment}
        onChange={(e)=> setAddComment(e.target.value)}
        />
    </form>
  )
}

export default CommentsAdder
