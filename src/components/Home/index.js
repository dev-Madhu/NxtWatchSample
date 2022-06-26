import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import VideoItem from '../VideoItem/VideoItem'
import TabItem from '../TabItem'
import './index.css'

import {ResponsiveContainer, HomeContainer} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeVideos: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(product => ({
        title: product.title,
        viewCount: product.view_count,
        publishedAt: product.published_at,
        id: product.id,
        thumbnailUrl: product.thumbnail_url,
        imageUrl: product.channel.profile_image_url,
        name: product.channel.name,
        rating: product.rating,
      }))
      this.setState({
        homeVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getHomeVideos()
    this.setState({searchInput: ''})
  }

  renderVideosView = () => {
    const {searchInput} = this.state

    return (
      <div className="video-section">
        <div className="search-box">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onClickSearch}
          >
            <AiOutlineSearch size="20" />
          </button>
        </div>

        {this.renderAllViews()}
      </div>
    )
  }

  renderBannerView = () => (
    <div className="main-view">
      <div className="banner-view">
        <div className="banner-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="logo-theme"
            alt="website logo"
          />
          <p className="banner-description">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button type="button" className="get-btn">
            GET IT KNOW
          </button>
        </div>
      </div>
      <div className="main-video-section">{this.renderVideosView()}</div>
    </div>
  )

  renderHomeVideosView = () => {
    const {homeVideos} = this.state

    return (
      <ul className="videos-list">
        {homeVideos.map(videoItem => (
          <VideoItem key={videoItem.id} videoDetails={videoItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
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

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <>
        <HomeContainer>
          <ResponsiveContainer>
            <TabItem />
            {this.renderBannerView()}
          </ResponsiveContainer>
        </HomeContainer>
      </>
    )
  }
}

export default Home
