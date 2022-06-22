import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const HeaderRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
              alt="dark"
              className="profile"
            />
          </li>
          <li className="nav-menu-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />
          </li>
          <li className="nav-menu-item">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(HeaderRoute)
