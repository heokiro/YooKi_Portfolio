import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuButton from './common/MenuButton'
import ToggleMenu from './common/ToggleMenu'
import LineDecoration from './common/LineDecoration'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  position: relative;
  overflow: hidden;
`

const MenuButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
`

const MainTitle = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.1;
  text-align: center;
  margin: 0;

  span {
    display: block;
  }
`

const AllButton = styled.button`
  position: absolute;
  right: 60px;
  bottom: 60px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s ease;
  z-index: 10;

  &:hover {
    opacity: 0.7;
  }

  &::after {
    content: '→';
    font-size: 1.2rem;
  }
`

const CornerDecoration = styled.div`
  position: absolute;
  right: 40px;
  bottom: 100px;
  width: 100px;
  height: 60px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
`

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const titleText = 'PORTFOLIO'
  const splitTitle = () => {
    const chars = titleText.split('')
    const lines = []
    const charsPerLine = 3

    for (let i = 0; i < chars.length; i += charsPerLine) {
      lines.push(chars.slice(i, i + charsPerLine).join(''))
    }

    return lines
  }

  return (
    <Container>
      <MenuButtonWrapper>
        <MenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
      </MenuButtonWrapper>

      <LineDecoration variant="home" verticalHeight="40px" horizontalWidth="120px" />

      <MainTitle>
        {splitTitle().map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </MainTitle>

      <CornerDecoration />

      <AllButton onClick={() => navigate('/portfolio')}>
        All
      </AllButton>

      <ToggleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Container>
  )
}

export default HomePage
