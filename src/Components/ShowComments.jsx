import { useEffect, useState } from "react"
import fetchApi from "./fetchApi"
import { useParams } from "react-router-dom"
import CommentsCard from "./CommentsCard"
function ShowComments() {
  const [comments, setComments] = useState([])
  const {id} = useParams()
  
  useEffect(() => {
    const fetchCommentsById = async () => {
        
        try {
            const response = await fetchApi().get(`/api/articles/${id}/comments`)
            setComments(response.data.comments)
            
        } catch(err){
            
        }
    }
    fetchCommentsById()
    
  }, [])
  return (

    <section id="home-comments">
        <div className="comments-container">
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
                  />
                </form>
                {comments.map((comment) => (
                  <CommentsCard comment={comment} key ={comment.comment_id
                  }/>
                ))}
            </div>
        </div>

    </section>
  )
}

export default ShowComments
