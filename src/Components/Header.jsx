import logo from './assets/logo.png'
import {Link} from 'react-router-dom'
export default function Header() {
  return (
    <div className="container">
    <div >
        <a href="#"><img src={logo} alt="nc_news logo" className='logo'/></a>
    </div>
    <ul>
      <li><Link to="/" className='current'>Home</Link></li>
     
    </ul>
    </div>
  )
}
