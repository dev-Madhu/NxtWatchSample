import TabItem from '../TabItem'
import HeaderRoute from '../HeaderRoute'
import './NotFound.css'
import SavedContext from '../../context/SavedContext'

const NotFound = () => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      const darkBg = isDarkTheme ? 'not-bg' : null

      return (
        <>
          <HeaderRoute />
          <div className="not-found-view">
            <TabItem />
            <div className={`not-found-container ${darkBg}`}>
              <img src={imgUrl} alt="not found" className="not-found-img" />
              <h1 className="not-found-heading">Page Not Found</h1>
              <p className="description">
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </>
      )
    }}
  </SavedContext.Consumer>
)

export default NotFound
