import {Component} from 'react'
import Cookies from 'js-cookie'
import VideoPlayer from '../VideoPlayer'
import './VideoItemDetails.css'
import TabItem from '../TabItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItemData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        videoUrl: fetchedData.video_details.video_url,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        name: fetchedData.video_details.channel.name,
        imageUrl: fetchedData.video_details.channel.profile_image_url,
        subscriberCount: fetchedData.video_details.channel.subscriber_count,
        viewCount: fetchedData.video_details.view_count,
        title: fetchedData.video_details.title,
        publishedAt: fetchedData.video_details.published_at,
      }
      this.setState({
        videoItemData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {videoItemData, apiStatus} = this.state
    const {videoUrl} = videoItemData
    console.log(videoItemData)
    console.log(videoUrl)
    console.log(apiStatus)
    return (
      <div className="video-layout">
        <TabItem />
        <div className="video-container">
          <VideoPlayer videoInfo={videoItemData} />
        </div>
      </div>
    )
  }
}
export default VideoItemDetails
