import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getContent, getRandomPortfolio } from '../utils/contentLoader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  color: #fff;
`

const ViewAllButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`

const SiteName = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1rem;
  font-weight: 400;
  z-index: 10;
`

const MainText = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  z-index: 10;
  max-width: 600px;
  white-space: pre-line;
`

const WorkName = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  font-weight: 400;
  z-index: 10;
  text-align: right;
`

const ScrollButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`

const ScrollIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top: none;
  border-radius: 0 0 10px 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0%, 100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    50% {
      opacity: 0;
      transform: translateX(-50%) translateY(8px);
    }
  }
`

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  opacity: ${props => props.image ? 0.3 : 0};
  z-index: 0;
`


function HomePage() {
  const content = getContent()
  const [randomPortfolio, setRandomPortfolio] = useState(null)

  // 랜덤 포트폴리오 선택
  useEffect(() => {
    const portfolio = getRandomPortfolio()
    setRandomPortfolio(portfolio)
  }, [])

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  if (!randomPortfolio) {
    return <Container>Loading...</Container>
  }

  return (
    <Container>
      <BackgroundImage image={randomPortfolio.image} />
      
      <ViewAllButton>전체보기</ViewAllButton>
      
      <SiteName>{content.siteName}</SiteName>
      
      <MainText>{randomPortfolio.title}</MainText>
      
      <WorkName>{randomPortfolio.workName}</WorkName>
      
      <ScrollButton onClick={handleScroll}>
        <div>스크롤</div>
        <ScrollIcon />
      </ScrollButton>
    </Container>
  )
}

export default HomePage
