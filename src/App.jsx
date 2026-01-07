import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { getContent } from './utils/contentLoader'
import BouncingBox from './components/BouncingBox'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
`

const TextWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const NameBase = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #000;
`

const NameOverlay = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: ${props => props.clipPath || 'none'};
  pointer-events: none;
`

const TitleBase = styled.p`
  font-size: 1.5rem;
  color: #000;
  margin: 0;
`

const TitleOverlay = styled.p`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: ${props => props.clipPath || 'none'};
  pointer-events: none;
`

function App() {
  const content = getContent()
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
  const nameWrapperRef = useRef(null)
  const titleWrapperRef = useRef(null)
  const [nameClipPath, setNameClipPath] = useState('none')
  const [titleClipPath, setTitleClipPath] = useState('none')

  const handlePositionChange = (position) => {
    setCirclePosition(position)
    
    // Name 텍스트의 clip-path 계산
    if (nameWrapperRef.current) {
      const rect = nameWrapperRef.current.getBoundingClientRect()
      const circleCenterX = position.x + 100 - rect.left
      const circleCenterY = position.y + 100 - rect.top
      setNameClipPath(`circle(100px at ${circleCenterX}px ${circleCenterY}px)`)
    }
    
    // Title 텍스트의 clip-path 계산
    if (titleWrapperRef.current) {
      const rect = titleWrapperRef.current.getBoundingClientRect()
      const circleCenterX = position.x + 100 - rect.left
      const circleCenterY = position.y + 100 - rect.top
      setTitleClipPath(`circle(100px at ${circleCenterX}px ${circleCenterY}px)`)
    }
  }

  return (
    <Container>
      <BouncingBox onPositionChange={handlePositionChange} />
      <TextWrapper ref={nameWrapperRef}>
        <NameBase>{content.name}</NameBase>
        <NameOverlay clipPath={nameClipPath}>
          {content.name}
        </NameOverlay>
      </TextWrapper>
      <TextWrapper ref={titleWrapperRef}>
        <TitleBase>{content.title}</TitleBase>
        <TitleOverlay clipPath={titleClipPath}>
          {content.title}
        </TitleOverlay>
      </TextWrapper>
      {/* 포트폴리오 내용이 여기에 들어갈 예정입니다 */}
    </Container>
  )
}

export default App