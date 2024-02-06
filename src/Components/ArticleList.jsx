import ArticleCard from "./ArticleCard"
import axios from 'axios'
import { useEffect, useState } from "react";

export default function ArticleList() {
    const [articles, setArticles] = useState([])

    const articleApi = axios.create({
        baseURL: 'https://newsapp-7o7y.onrender.com'
      });
      
      useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleApi.get('/api/articles')
                setArticles(response.data.articles)
                console.log(response.data.articles)
            } catch(err){
                
            }
        }
        fetchArticles()
      }, [])

  return (
    <>
        <section  id='home-articles' className='py-2'>
            <div className='container'>
                <div className='articles-container'>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={article.id}/>
                    ))}
                
                </div>  
            </div>
            
        </section>
    
    </>
    
  )
}
