import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import SavedContext from '../../context/SavedContext'
import './index.css'

const HeaderRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <SavedContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value

        const onClickThemeBtn = () => {
          toggleTheme()
        }

        const websiteLogo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const darkMode = isDarkTheme ? 'nav-bg' : null
        return (
          <nav className={`nav-header ${darkMode}`}>
            <div className="nav-content">
              <Link to="/" className="nav-link">
                <img
                  className="website-logo"
                  src={websiteLogo}
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <button
                    type="button"
                    className="theme-button"
                    data-testid="theme"
                    onClick={onClickThemeBtn}
                  >
                    {isDarkTheme ? (
                      <FiSun size="35" color="#fff" />
                    ) : (
                      <FaMoon size="35" />
                    )}
                  </button>
                </li>
                <li className="nav-menu-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile"
                  />
                </li>
                <li className="nav-menu-item">
                  <div>
                    <Popup
                      modal
                      trigger={
                        <button type="button" className="logout-btn">
                          Logout
                        </button>
                      }
                      className="popup-content"
                    >
                      {close => (
                        <div className="modal-container">
                          <p className="pop-up-text">
                            Are you sure, you want to logout?
                          </p>
                          <div>
                            <button
                              className="cancel"
                              type="button"
                              onClick={() => close()}
                            >
                              Cancel
                            </button>
                            <button
                              className="confirm"
                              type="button"
                              onClick={onClickLogout}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default withRouter(HeaderRoute)
