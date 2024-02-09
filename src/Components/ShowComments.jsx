import { useEffect, useState } from "react"
import fetchApi from "./fetchApi"
import { useParams } from "react-router-dom"
import CommentsCard from "./CommentsCard"
import CommentLoader from "./CommentLoader"


function ShowComments() {
 
  const [comments, setComments] = useState([])
  const [addComment, setAddComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const {id} = useParams()
  useEffect(() => {
    const fetchCommentsById = async () => {
        setCommentLoading(true)
        try {
            const response = await fetchApi().get(`/api/articles/${id}/comments`)
            
            setComments(response.data.comments)
            setCommentLoading(false)
        } catch(err){
            
        }
    }
    fetchCommentsById()
    
  }, [])
  
  return (

    <section id="home-comments">
        <div className="comments-container">
          {commentLoading ? <CommentLoader /> :
            <div className="comments">
                <div className="comment-section">
                  <h3>{comments.length} Comments</h3>
                  <span>Sort by</span>
                </div>
                <form id="comment-form">
                  <label htmlFor="input"></label>
                  <input type="text" 
                  placeholder="Add a comments..."
                  id="input"
                  value={addComment}
                  onChange={(e)=> setAddComment(e.target.value)}
                  />
                </form>
                {comments.map((comment) => (
                  <CommentsCard comment={comment} key ={comment.comment_id
                  }/>
                ))}
            </div>
}
        </div>
                

    </section>
  )
}

export default ShowComments
