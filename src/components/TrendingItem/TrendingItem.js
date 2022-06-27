import {Link} from 'react-router-dom'

import './TrendingItem.css'

const TrendingItem = props => {
  const {blogData} = props

  const {id, title, thumbnailUrl, viewCount, publishedAt} = blogData

  return (
    <li>
      <Link to={`/videos/${id}`} className="blog-item-link">
        <div className="item-container">
          <img className="item-image" src={thumbnailUrl} alt={`item${id}`} />
          <div className="item-info">
            <p className="item-topic">{title}</p>
            <div className="author-info">
              <p className="author-name">{viewCount} </p>
              <p className="author-name"> -{publishedAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default TrendingItem
