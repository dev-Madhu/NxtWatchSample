import styled from 'styled-components/macro'

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1110px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`
export const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #ffff;
  display: flex;
  align-items: center;
`
export const TypeName = styled.h1`
  font-size: 16px;
  font-family: 'Roboto';
  color: #212121;
  font-weight: 700;
  margin-left: 20px;
`

export const SelectionsContainer = styled.div`
  width: 30%;
  max-width: 250px;
  min-height: 100vh;
`
export const SectionCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150vh;
`

export const SelectionBox = styled.ul`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  list-style-type: none;
`

export const SelectionItem = styled.li`
  margin-bottom: 10px;
`

export const SocialBox = styled.div`
  display: flex;
  align-items: center;
`
export const SocialWebsites = styled.div`
  padding-left: 20px;
  align-self: flex-end;
`
export const Icon = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`
export const Heading = styled.h1`
  font-size: 20px;
  font-weight: bold;
  font-family: 'Roboto';
  color: #1e293b;
  margin-bottom: 20px;
`
export const Tagline = styled.p`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Roboto';
  color: #00306e;
`
export const Image = styled.img`
  width: 30px;
  height: 30px;
`
