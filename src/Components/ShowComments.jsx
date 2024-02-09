import { useEffect, useState } from "react"
import fetchApi from "./fetchApi"
import { useParams } from "react-router-dom"
import CommentsCard from "./CommentsCard"
import CommentLoader from "./CommentLoader"
import CommentsAdder from "./CommentsAdder"


function ShowComments() {
 
  const [comments, setComments] = useState([])
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

  function deleteComment(id){
    
      fetchApi().delete(`/api/comments/${id}`).then(() => {
        setComments((currentComments) => {
          return currentComments.filter((comment) => comment.comment_id !== id)
        })
      })
      
 
  }
  
  return (

    <section id="home-comments">
        <div className="comments-container">
          {commentLoading ? <CommentLoader /> :
            <div className="comments">
                <div className="comment-section">
                  <h3>{comments.length} Comments</h3>
                  <span>Sort by</span>
                </div>
                {<CommentsAdder id={id} setComments={setComments}/>}
                {comments.map((comment) => (
                  <CommentsCard deleteComment ={deleteComment} comment={comment} key ={comment.comment_id
                  } commentLoading={commentLoading} setCommentLoading ={setCommentLoading}/>
                ))}
            </div>
}
        </div>
                

    </section>
  )
}

export default ShowComments
