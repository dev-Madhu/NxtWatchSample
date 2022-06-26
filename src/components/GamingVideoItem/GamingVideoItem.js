import {Link} from 'react-router-dom'

import './GamingVideoItem.css'

const GamingVideoItem = props => {
  const {gameData} = props
  const {id, title, thumbnailUrl, viewCount} = gameData

  return (
    <>
      <Link to={`/videos/${id}`} className="blog-item-link">
        <li className="gaming-item">
          <img src={thumbnailUrl} className="gaming-img" alt="game &{id}" />
          <h1 className="game-name">{title}</h1>
          <p className="game-description">{viewCount} Watching Worldwide</p>
        </li>
      </Link>
    </>
  )
}
export default GamingVideoItem
