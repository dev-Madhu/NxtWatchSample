import {useState} from 'react'
import {TabList, Tabs, TabPanel, Tab} from 'react-tabs'
import Home from '../Home'
import Trending from '../Trending/Trending'
import Gaming from '../Gaming/Gaming'

const SidePanel = () => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Home</Tab>
        <Tab>Trending</Tab>
        <Tab>Gaming</Tab>
      </TabList>
      <TabPanel>
        <Home />
      </TabPanel>
      <TabPanel>
        <Trending />
      </TabPanel>
      <TabPanel>
        <Gaming />
      </TabPanel>
    </Tabs>
  )
}

export default SidePanel
