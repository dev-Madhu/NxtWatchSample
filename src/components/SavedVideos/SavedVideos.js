import {MdPlaylistAdd} from 'react-icons/md'

import HeaderRoute from '../HeaderRoute'

import TrendingItem from '../TrendingItem/TrendingItem'
import TabItem from '../TabItem'

import SavedContext from '../../context/SavedContext'

import './SavedVideos.css'

const SavedVideos = () => (
  <SavedContext.Consumer>
    {value => {
      const {savedVideosList, isDarkTheme} = value
      console.log(savedVideosList)
      const showEmptyView = savedVideosList.length === 0
      const trendBg = isDarkTheme ? 'trend-headBg' : null
      const saveBg = isDarkTheme ? 'saved-bg' : null
      return (
        <>
          <HeaderRoute />
          <div className="saved-view">
            <TabItem />
            {showEmptyView ? (
              <div
                className={`saved-container ${saveBg}`}
                data-testid="savedVideos"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="saved-img"
                />
                <h1 className="saved-heading">No saved videos found</h1>
                <p className="saved-description">
                  You can save your videos while watching them
                </p>
              </div>
            ) : (
              <div className="saved-list-container">
                <div className={`trending-header ${trendBg}`}>
                  <div className="fire-icon">
                    <MdPlaylistAdd color=" #ff0000" size="30" />
                  </div>
                  <h1 className="trending-title">Saved Videos</h1>
                </div>
                {savedVideosList.map(item => (
                  <TrendingItem blogData={item} key={item.num} />
                ))}
              </div>
            )}
          </div>
        </>
      )
    }}
  </SavedContext.Consumer>
)
export default SavedVideos
