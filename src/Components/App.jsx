import {Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./Header"
import Footer from './Footer'
import ArticleList from './ArticleList'
import Article from './Article'
import { useState } from 'react'
function App() {
  const [isLoading, setIsLoading] = useState(false)
 

  return (
    <>
    <nav id="main-nav">
        <Header />
      </nav>
    
      <Routes>
        <Route exact path='/' element={
        <ArticleList 
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        />} />
        <Route path='/Article/:id' element ={
        <Article 
         isLoading={isLoading} 
         setIsLoading={setIsLoading}
         />} />
      </Routes>
    
      <Footer />
    </>
  )
}

export default App
