import {Link} from 'react-router-dom'
import SavedContext from '../../context/SavedContext'

import './index.css'

const SavedItem = props => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {blogData} = props

      const {id, title, thumbnailUrl, viewCount, publishedAt} = blogData
      const fontColor = isDarkTheme ? 'textColor' : null

      return (
        <li>
          <Link to={`/videos/${id}`} className="blog-item-link">
            <div className="item-container">
              <img
                className="saved-image"
                src={thumbnailUrl}
                alt={`item${id}`}
              />
              <div className={`item-info ${fontColor}`}>
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

export default SavedItem
