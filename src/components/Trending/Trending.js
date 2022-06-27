import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TrendingItem from '../TrendingItem/TrendingItem'

import TabItem from '../TabItem'
import HeaderRoute from '../HeaderRoute'
import './Trending.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingData: []}

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        imageUrl: eachItem.channel.profile_image_url,
        thumbnailUrl: eachItem.thumbnail_url,
        name: eachItem.channel.name,
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      this.setState({
        trendingData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      console.log(response.status)
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
      <Link to="/trending">
        <button className="failure-btn" type="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderTrendingVideos = () => {
    const {trendingData} = this.state
    return (
      <ul className="blog-list-container">
        <div className="trending-header">
          <div className="fire-icon">
            <HiFire color=" #ff0000" size="30" />
          </div>
          <h1 className="trending-title">Trending</h1>
        </div>
        {trendingData.map(item => (
          <TrendingItem blogData={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
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
        <div className="trending-box">
          <TabItem />
          {this.renderAllViews()}
        </div>
      </>
    )
  }
}

export default Trending
