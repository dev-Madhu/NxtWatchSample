import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './VideoItem.css'

const VideoItem = props => {
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
  const publishedDate = formatDistanceToNow(new Date(publishedAt))
  const renderVideoItem = () => (
    <>
      <img src={thumbnailUrl} className="thumbnail" alt="thumbnail url" />
      <div className="video-info">
        <img src={imageUrl} className="cricket-logo" alt="name" />
        <div className="match-details">
          <h1 className="title">{title}</h1>
          <p className="name">{name}</p>
          <div className="views-box">
            <p className="name">{viewCount}</p>
            <li className="published">{publishedDate}</li>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Link to={`/videos/${id}`} className="video-item">
      <li className="list-item">{renderVideoItem()}</li>
    </Link>
  )
}

export default VideoItem
