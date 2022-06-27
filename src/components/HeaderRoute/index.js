import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

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
        <Link to="/" className="nav-link">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <button type="button" className="theme-button" data-testid="theme">
              <FaMoon size="35" />
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
                      Are you sure,you want to logout?
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
}

export default withRouter(HeaderRoute)
