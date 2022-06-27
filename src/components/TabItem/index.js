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
    <SectionsContainer>
      <div className="sections-container">
        <Link className="section-link" to="/">
          <button type="button" className="section-btn">
            <AiFillHome size="30" color="#181818" />
            <h1 className="head">Home</h1>
          </button>
        </Link>
        <Link className="section-link" to="/trending">
          <button type="button" className="section-btn">
            <HiFire size="30" color="#181818" />
            <h1 className="head">Trending</h1>
          </button>
        </Link>
        <Link className="section-link" to="/gaming">
          <button type="button" className="section-btn">
            <SiYoutubegaming size="30" color="#181818" />
            <h1 className="head">Gaming</h1>
          </button>
        </Link>
        <Link className="section-link" to="/saved-videos">
          <button type="button" className="section-btn">
            <MdPlaylistAdd size="30" color="#181818" />
            <h1 className="head">Saved Videos</h1>
          </button>
        </Link>
      </div>
      {renderDetailsSection()}
    </SectionsContainer>
  )
}

export default TabItem
