import {Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./Header"
import Footer from './Footer'
import ArticleList from './ArticleList'
import Article from './Article'
import { useState } from 'react'
function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  function showArticle(id){
    setSelectedId(id)
  }

  return (
    <>
    <nav id="main-nav">
        <Header />
      </nav>
    
      <Routes>
        <Route path='/' element={
        <ArticleList 
        showArticle={showArticle} 
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        />} />
        <Route path='/article' element ={
        <Article selectedId={selectedId}
         isLoading={isLoading} 
         setIsLoading={setIsLoading}
         />} />
      </Routes>
    
      <Footer />
      {/* <section id='home-articles' className='py-2'>
        <div className='container'>
        < ArticleList />
        </div>
      </section> */}
    </>
  )
}

export default App
