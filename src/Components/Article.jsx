import { useEffect, useState } from "react"
import fetchApi from "./fetchApi"
import { PiHandsClappingThin } from "react-icons/pi";
import { TfiComments } from "react-icons/tfi";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import ShowComments from "./ShowComments";


export default function Article({isLoading, setIsLoading}) {
  const {id} = useParams()
  const [article, setArticle] = useState({})
  const [listComments, setListComments] = useState(false)
  
  
  const {article_id, article_img_url
    , author
    , body, comment_count, created_at, title, topic, votes} = article
  
  useEffect(() => {
    const fetchArticleById = async () => {
        setIsLoading(true)
        try {
            const response = await fetchApi().get(`/api/articles/${id}`)
            
            setArticle(response.data.articles)
            setIsLoading(false)
            
        } catch(err){
            
        }
    }
    fetchArticleById()
    
  }, [])
  
  function handleListComments(){
    setListComments(()=> !listComments)
  }

 
  
  return (
    <section id="home-single-article">
      <div className="main-container">
        {isLoading ? <Loader /> :
        <div className="single-article-container">
          <h1>{title}</h1>
          <div id="info">
            <div className="author">Written By: {author}</div>
            <div className="date">{created_at}</div>
          </div>
          <div id="icon">
            <div id="vote" onClick={()=> increaseVote()}>{<PiHandsClappingThin />}
            <span id="num-vote-comment">{votes}</span>
            </div>
            <div id="comment">{<TfiComments/>}
            <span id="num-vote-comment">{comment_count}</span>
            </div>
          </div>
          <div className="article-image"><img src={article_img_url} alt="article-image" /></div>
          <div id="topic">{topic}</div>
          <div id="content">{body}</div>
          <div id="icon">
            <div  className="voteClick" onClick={()=> increaseVote()}>{<PiHandsClappingThin />}
            <span id="num-vote-comment">{votes}</span>
            </div>
            <div className="commentClick" onClick={()=> handleListComments()}>{<TfiComments/>}
            <span id="num-vote-comment">{comment_count}</span>
            </div>
          </div>
          <div>{listComments && <ShowComments /> }</div>
          
        </div>
        }
      </div>
    </section>
    
  )
}
