import ReactPlayer from 'react-player'
import {Component} from 'react'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import SavedContext from '../../context/SavedContext'

import {
  VideoPlayerContainer,
  VideoTitle,
  VideoStats,
  VideoSubscriberBox,
  LikeText,
  VideoBox,
  VideoLogo,
  MajorBox,
  VideoLikes,
  LikeBox1,
  LikeBox2,
  LikeBox3,
  HorizontalLine,
  VideoName,
  VideoSub,
} from './StyledComponents'

import './index.css'

class VideoPlayer extends Component {
  state = {isLiked: false, isDisliked: false, isSaved: false}

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDisLike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderVideoPlayerView = () => (
    <SavedContext.Consumer>
      {value => {
        const {addVideoItem} = value

        const {videoInfo} = this.props
        console.log(videoInfo)
        const onClickSave = () => {
          this.setState(prevState => ({isSaved: !prevState.isSaved}))
          addVideoItem(videoInfo)
        }

        const {
          videoUrl,
          imageUrl,
          title,
          subscriberCount,
          description,
          publishedAt,
          viewCount,
          name,
        } = videoInfo
        const {isLiked, isDisliked, isSaved} = this.state
        return (
          <VideoPlayerContainer>
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              className="video-player"
            />
            <VideoTitle>{title}</VideoTitle>
            <VideoLikes>
              <VideoStats>
                {viewCount} - {publishedAt}
              </VideoStats>
              <MajorBox>
                <LikeBox1
                  type="button"
                  col={isLiked}
                  onClick={this.onClickLike}
                >
                  <BiLike size="20" />
                  <LikeText>Like</LikeText>
                </LikeBox1>
                <LikeBox2
                  type="button"
                  col={isDisliked}
                  onClick={this.onClickDisLike}
                >
                  <BiDislike size="20" />
                  <LikeText>Dislike</LikeText>
                </LikeBox2>
                <LikeBox3 type="button" col={isSaved} onClick={onClickSave}>
                  <CgPlayListAdd size="20" />
                  <LikeText>Save</LikeText>
                </LikeBox3>
              </MajorBox>
            </VideoLikes>
            <HorizontalLine />
            <VideoSubscriberBox>
              <VideoLogo src={imageUrl} alt="profile" />
              <VideoBox>
                <VideoName>{name}</VideoName>
                <VideoSub>{subscriberCount} subscribers</VideoSub>
                <VideoTitle>{description}</VideoTitle>
              </VideoBox>
            </VideoSubscriberBox>
          </VideoPlayerContainer>
        )
      }}
    </SavedContext.Consumer>
  )

  render() {
    return <>{this.renderVideoPlayerView()}</>
  }
}
export default VideoPlayer
