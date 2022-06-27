import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'

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
  LikeBox,
  HorizontalLine,
  VideoName,
  VideoSub,
} from './StyledComponents'

import './index.css'

const VideoPlayer = props => {
  const {videoInfo} = props
  console.log(videoInfo)
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
          <LikeBox type="button">
            <BiLike size="20" color="#475569" />
            <LikeText>Like</LikeText>
          </LikeBox>
          <LikeBox type="button">
            <BiDislike size="20" color="#475569" />
            <LikeText>Dislike</LikeText>
          </LikeBox>
          <LikeBox type="button">
            <CgPlayListAdd size="20" color="#475569" />
            <LikeText>Save</LikeText>
          </LikeBox>
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
}
export default VideoPlayer
