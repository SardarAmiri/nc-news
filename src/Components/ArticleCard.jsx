
import {Link} from 'react-router-dom'
import { PiHandsClappingThin } from "react-icons/pi";
import { TfiComments } from "react-icons/tfi";

export default function ArticleCard({article, showArticle}) {

  return (
    <>
      
      <article className="card">
        <img src={article.article_img_url} alt="logo" />
        <div className='category category-tech'> {article.topic} </div>
        <div>Written by: {article.author} </div>
        <div>📅 {article.created_at}</div><br />
          <h3>
          <Link to='/Article' >{article.title}</Link>
          </h3>
          <Link to='/Article' className='btn' onClick={()=> showArticle(article.article_id)}>Read More</Link>
          <div><PiHandsClappingThin className='clap'/>{article.votes}</div>
          <div><TfiComments className='comments'/>{article.comment_count}</div>
      </article>
      
    </>
  )
}

