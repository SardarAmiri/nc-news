import {Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./Header"
import Footer from './Footer'
import ArticleList from './ArticleList'
import Articles from './Articles'
function App() {
  

  return (
    <>
    <nav id="main-nav">
        <Header />
      </nav>
    
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/article' element ={<Articles />} />
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
