import ArticleCard from "./ArticleCard"
import fetchApi from "./fetchApi";
import Loader from "./Loader";
import { useEffect, useState } from "react";

export default function ArticleList({showArticle, isLoading, setIsLoading}) {
    const [articles, setArticles] = useState([])
    
      useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true)
            try {
                const response = await fetchApi().get('/api/articles')
                console.log(response.data.articles)
                setArticles(response.data.articles)
                setIsLoading(false)
            } catch(err){
                
            }
        }
        fetchArticles()
      }, [])


      

  return (
    <> 
        
        <section  id='home-articles' className='py-2'>
            <div className='container'>
                {isLoading ? <Loader /> :
                <div className='articles-container'>
                    {articles.map((article) => (
                        <ArticleCard key={article.article_id} article={article} showArticle={showArticle}/>
                    ))}
                
                </div>  
}               
            </div>
        </section>
        
    </>
    
  )
}
