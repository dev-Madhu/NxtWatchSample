import {Link} from 'react-router-dom'
import SavedContext from '../../context/SavedContext'
import './TrendingItem.css'

const TrendingItem = props => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {blogData} = props

      const {id, title, thumbnailUrl, viewCount, publishedAt} = blogData
      const textColor = isDarkTheme ? 'text-color' : null

      return (
        <li>
          <Link to={`/videos/${id}`} className="blog-item-link">
            <div className="item-container">
              <img
                className="item-image"
                src={thumbnailUrl}
                alt={`item${id}`}
              />
              <div className={`item-info ${textColor}`}>
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
    }}
  </SavedContext.Consumer>
)

export default TrendingItem
