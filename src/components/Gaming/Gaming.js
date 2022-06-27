import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import GamingVideoItem from '../GamingVideoItem/GamingVideoItem'
import './Gaming.css'
import TabItem from '../TabItem'
import HeaderRoute from '../HeaderRoute'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingData: []}

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        gamingData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-note">
        We are having some trouble to complete your request
      </p>
      <p className="failure-note">Please try again</p>
      <button
        className="failure-btn"
        type="button"
        onClick={this.onClickSearch}
      >
        Retry
      </button>
    </div>
  )

  renderGamingVideos = () => {
    const {gamingData} = this.state
    return (
      <>
        <div className="game-list-container">
          <div className="trending-header">
            <div className="fire-icon">
              <SiYoutubegaming color=" #ff0000" size="30" />
            </div>
            <h1 className="trending-title">Gaming</h1>
          </div>
          {gamingData.map(item => (
            <GamingVideoItem gameData={item} key={item.id} />
          ))}
        </div>
      </>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderRoute />
        <div className="gaming-container">
          <TabItem />
          {this.renderAllViews()}
        </div>
      </>
    )
  }
}

export default Gaming
