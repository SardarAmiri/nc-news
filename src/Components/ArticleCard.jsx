
import {Link} from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { TfiComments } from "react-icons/tfi";

export default function ArticleCard({article}) {
 
  
  return (
    <>
      
      <article className="card">
        <img src={article.article_img_url} alt="logo" />
        <div className='category category-tech'> {article.topic} </div>
        <div>Written by: {article.author} </div>
        <div>🗓️ {article.created_at}</div><br />
          <h3>
          <Link to='/Article/:article_id' >{article.title}</Link>
          </h3>
          <Link to={`/Article/${article.article_id}`} className='btn'>Read More</Link>
          <div><SlLike className='clap'/>{article.votes}</div>
          <div><TfiComments className='comments'/>{article.comment_count}</div>
      </article>
      
    </>
  )
}

