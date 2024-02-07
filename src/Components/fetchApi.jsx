
import axios from 'axios'

export default function fetchApi() {
    const articleApi = axios.create({
        baseURL: 'https://newsapp-7o7y.onrender.com'
      });
  return (
    articleApi
  )
}
