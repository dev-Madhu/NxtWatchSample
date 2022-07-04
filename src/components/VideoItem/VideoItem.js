import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import SavedContext from '../../context/SavedContext'

import './VideoItem.css'

const VideoItem = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    imageUrl,
    name,
    viewCount,
    publishedAt,
  } = videoDetails
  const renderVideoItem = () => (
    <SavedContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const matchColor = isDarkTheme ? 'match-color' : null

        return (
          <>
            <img
              src={thumbnailUrl}
              className="thumbnail"
              alt="video thumbnail"
            />
            <div className="video-info">
              <img src={imageUrl} className="cricket-logo" alt="channel logo" />
              <div className={`match-details ${matchColor}`}>
                <h1 className="title">{title}</h1>
                <p className="name">{name}</p>
                <div className="views-box">
                  <p className="name">{viewCount}</p>
                  <p className="published">{publishedAt}</p>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </SavedContext.Consumer>
  )

  return (
    <Link to={`/videos/${id}`} className="video-item">
      <li className="list-item">{renderVideoItem()}</li>
    </Link>
  )
}

export default VideoItem
