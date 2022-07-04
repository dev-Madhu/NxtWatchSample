import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import SavedContext from '../../context/SavedContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isChecked: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, isChecked} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        {isChecked ? (
          <input
            type="text"
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
        ) : (
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
        )}
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <SavedContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          const loginClass = isDarkTheme ? 'login-bg' : null
          const loginForm = isDarkTheme ? 'login-form-bg' : null
          const inpClass = isDarkTheme ? 'input-col' : null

          return (
            <div className={`login-form-container ${loginClass}`}>
              <form
                className={`form-container ${loginForm}`}
                onSubmit={this.submitForm}
              >
                <img
                  src={websiteLogo}
                  className="login-website-logo-desktop-img"
                  alt="website logo"
                />
                <div className={`input-container ${inpClass}`}>
                  {this.renderUsernameField()}
                </div>
                <div className={`input-container ${inpClass}`}>
                  {this.renderPasswordField()}
                </div>
                <div className="checkbox-section">
                  <input
                    type="checkbox"
                    className="check"
                    id="input-checkbox"
                    onChange={this.onChangeCheckBox}
                  />
                  <label htmlFor="input-checkbox" className="show-password">
                    Show Password
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Login
