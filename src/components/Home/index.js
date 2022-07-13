import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import VideoItem from '../VideoItem/VideoItem'
import TabItem from '../TabItem'
import HeaderRoute from '../HeaderRoute'
import SavedContext from '../../context/SavedContext'
import './index.css'

import {ResponsiveContainer, HomeContainer, Banner} from './StyledComponents'

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
    showComponent: false,
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
        searchInput: '',
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickCloseBtn = () => {
    this.setState(prevState => ({showComponent: !prevState.showComponent}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getHomeVideos)
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
            data-testid="searchButton"
            onClick={this.onClickSearchIcon}
          >
            <AiOutlineSearch size="20" />
          </button>
        </div>

        {this.renderAllViews()}
      </div>
    )
  }

  renderBannerView = () => (
    <SavedContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const activeName = isDarkTheme ? 'active-color' : null
        const {showComponent} = this.state
        return (
          <div className="main-view" testid="home">
            {!showComponent && (
              <Banner data-testid="banner">
                <button
                  className="close-btn"
                  type="button"
                  data-testid="close"
                  onClick={this.onClickCloseBtn}
                >
                  <IoMdClose size="30" color="#231f20" />
                </button>
                <div className="banner-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    className="logo-theme"
                    alt="nxt watch logo"
                  />
                  <p className="banner-description">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button type="button" className="get-btn">
                    GET IT NOW
                  </button>
                </div>
              </Banner>
            )}
            <div className={`main-video-section ${activeName}`}>
              {this.renderVideosView()}
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )

  onClickResearchBtn = () => {
    this.getHomeVideos()
  }

  renderHomeVideosView = () => {
    const {searchInput, homeVideos} = this.state
    const searchedResults = homeVideos.filter(item =>
      item.title.toLowerCase().includes(searchInput),
    )
    const items = searchedResults.length === 0

    return (
      <>
        {items ? (
          <div className="no-search-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="no-search"
            />
            <h1 className="no-search-title">No Search results found</h1>
            <p className="no-search-text">
              Try different key words or remove search filter
            </p>
            <button
              type="button"
              className="no-search-btn"
              onClick={this.onClickResearchBtn}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="videos-list">
            {searchedResults.map(videoItem => (
              <VideoItem key={videoItem.id} videoDetails={videoItem} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderHomeLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomeFailure = () => (
    <div className="failure-container" testid="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-note"> We are having some trouble</p>
      <Link to="/">
        <button className="failure-btn" type="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderHomeLoading()
      case apiStatusConstants.success:
        return this.renderHomeVideosView()
      case apiStatusConstants.failure:
        return this.renderHomeFailure()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <SavedContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <HeaderRoute />
              <HomeContainer bgCol={isDarkTheme}>
                <ResponsiveContainer>
                  <TabItem />
                  {this.renderBannerView()}
                </ResponsiveContainer>
              </HomeContainer>
            </>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Home
