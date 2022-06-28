import TabItem from '../TabItem'
import HeaderRoute from '../HeaderRoute'
import './NotFound.css'

const lightUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

const NotFound = () => (
  <>
    <HeaderRoute />
    <div className="not-found-view">
      <TabItem />
      <div className="not-found-container">
        <img src={lightUrl} alt="not found" className="not-found-img" />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="description">
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
)

export default NotFound
