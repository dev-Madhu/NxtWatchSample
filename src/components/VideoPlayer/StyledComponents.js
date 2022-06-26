import styled from 'styled-components'

export const VideoPlayerContainer = styled.div`
  width: 100%;
`

export const VideoTitle = styled.h1`
  color: #334155;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
`

export const VideoName = styled(VideoTitle)`
  margin-top: 0px;
`

export const VideoStats = styled.p`
  color: #475569;
  font-family: 'Roboto';
  font-size: 18px;
`

export const VideoSub = styled(VideoStats)`
  margin-top: 0;
`

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid #475569;
  margin-top: 30px;
  margin-bottom: 30px;
`
export const VideoSubscriberBox = styled.div`
  display: flex;
  flex-direction: row;
`
export const VideoLogo = styled.img`
  width: 50px;
  height: 50px;
`
export const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`
export const VideoLikes = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LikeBox = styled.button`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 8px 16px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
`
export const MajorBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
`
export const LikeText = styled.p`
  color: #475569;
  font-family: 'Roboto';
  font-size: 18px;
  padding-left: 4px;
`
