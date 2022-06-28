import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import {
  SectionsContainer,
  SocialWebsites,
  SocialBox,
  Heading,
  Image,
  Tagline,
  Icon,
} from './StyledComponents'
import './index.css'
import SavedContext from '../../context/SavedContext'

const TabItem = () => {
  const renderDetailsSection = () => (
    <SocialWebsites>
      <Heading>CONTACT US</Heading>
      <SocialBox>
        <Icon>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
        </Icon>
        <Icon>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
        </Icon>
        <Icon>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt=" linked in logo"
          />
        </Icon>
      </SocialBox>
      <Tagline>Enjoy! Now to see your channels and recommendations!</Tagline>
    </SocialWebsites>
  )

  return (
    <SavedContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const headClass = isDarkTheme ? 'h1-head' : null

        return (
          <SectionsContainer bgColor={isDarkTheme}>
            <div className="sections-container">
              <Link className="section-link" to="/">
                <button type="button" className={`section-btn ${headClass}`}>
                  <AiFillHome size="30" />
                  <h1 className="head">Home</h1>
                </button>
              </Link>
              <Link className="section-link" to="/trending">
                <button type="button" className={`section-btn ${headClass}`}>
                  <HiFire size="30" />
                  <h1 className="head">Trending</h1>
                </button>
              </Link>
              <Link className="section-link" to="/gaming">
                <button type="button" className={`section-btn ${headClass}`}>
                  <SiYoutubegaming size="30" />
                  <h1 className="head">Gaming</h1>
                </button>
              </Link>
              <Link className="section-link" to="/saved-videos">
                <button type="button" className={`section-btn ${headClass}`}>
                  <MdPlaylistAdd size="30" />
                  <h1 className="head">Saved Videos</h1>
                </button>
              </Link>
            </div>
            {renderDetailsSection()}
          </SectionsContainer>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default TabItem
