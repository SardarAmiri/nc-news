import { useEffect, useState } from "react"
import fetchApi from "./fetchApi"
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { TfiComments } from "react-icons/tfi";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import ShowComments from "./ShowComments";
import { Link } from "react-router-dom";
// import CommentLoader from "./CommentLoader";


export default function Article({isLoading, setIsLoading}) {
  const {id} = useParams()
  const [article, setArticle] = useState({})
  const [error, setError] = useState(null)
  const [listComments, setListComments] = useState(false)
  const [likeBtn, setLikeBtn] = useState(false)
  const [disLikeBtn, setDisLikeBtn] = useState(false)
  
 
  const {article_img_url
    , author
    , body, comment_count, created_at, title, topic, votes} = article
    
  useEffect(() => {
    const fetchArticleById = async () => {
        setIsLoading(true)
        try {
            const response = await fetchApi().get(`/api/articles/${id}`)
            setArticle(response.data.articles)
            setIsLoading(false)
            setError(null)
            
        } catch(err){
            setError(err)
            setIsLoading(false)
        }
    }
    fetchArticleById()
    
  }, [])

  function handleListComments(){
    
    setListComments(()=> !listComments)
    
  }

  
 function increaseVote() {
setLikeBtn(()=> (
  !likeBtn
))
setDisLikeBtn(false)
  fetchApi().patch(`/api/articles/${id}`, {inc_votes: 1})
  .then(() => {
    setError(null)
  })
  .catch((err) => {
    setArticle((currentData) => (
      {...currentData, votes: currentData.votes - 1}
    ))
    setError('something went wrong')
  })

  setArticle((currentData) => (
    {...currentData, votes: currentData.votes + 1}
  ))
 }
 function decreaseVote(){
  setDisLikeBtn(true)
  setLikeBtn(false)
  fetchApi().patch(`/api/articles/${id}`, {inc_votes: -1})
  .then(() => {
    setError(null)
  })
  .catch((err) => {
    setArticle((currentData) => (
      {...currentData, votes: currentData.votes + 1}
    ))
    setError('something went wrong')
  })

  setArticle((currentData) => (
    {...currentData, votes: currentData.votes - 1}
  ))
 }
  
    
  
  
 
  
  return (
    <section id="home-single-article">
      
      <div className="main-container">
        {isLoading ? <Loader /> :
        <div className="single-article-container">
          
          <button id="back-btn"><Link to='/'>Back</Link></button>
          <h1>{title}</h1>
          <div id="info">
            <div className="author">Written By: {author}</div>
            <div className="date">{created_at}</div>
          </div>
         
          <div className="article-image"><img src={article_img_url} alt="article-image" /></div>
          <div id="topic">{topic}</div>
          <div id="content">{body}</div>
          <div id="icon">
            <button disabled={likeBtn} style={likeBtn ? {} : {color:'red'}} className="voteClick" onClick={()=>increaseVote()}>{<SlLike/>}
            {error === null ? null: <span id="error">some error</span>}
            </button>
            <span id="num-vote">{votes}</span>
            <button disabled={disLikeBtn} style={disLikeBtn ? {} : {color:'red'}}className="voteClick" onClick={()=>decreaseVote()}>{<SlDislike />}
            {error === null ? null: <span id="error">some error</span>}
            </button>
            
            <button className="commentClick" style={listComments ? {}: {color: 'red'}} onClick={()=>handleListComments()}>{<TfiComments />}
            <span id="num-vote-comment">{comment_count}</span>
            </button>
          </div>
         
          <div>{listComments &&  <ShowComments isLoading={isLoading} setIsLoading={setIsLoading}/> }</div>
        
        </div>
        }
      </div>
    </section>
    
  )
}
