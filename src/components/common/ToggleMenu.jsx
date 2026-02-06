import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuButton from './MenuButton'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 1000;
  display: flex;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s ease;
`

const MenuButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`

const CurveLine = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
`

const MenuList = styled.nav`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
`

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
`

const MenuText = styled.span`
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.05em;
`

const LineFromButton = styled.div`
  position: absolute;
  top: 70px;
  left: 70px;
  width: 2px;
  height: 60px;
  background: #fff;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: transparent;
    transform: translate(-3px, 4px);
  }
`

function ToggleMenu({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    onClose()
    setTimeout(() => {
      navigate(path)
    }, 300)
  }

  return (
    <Overlay $isOpen={isOpen}>
      <MenuButtonWrapper>
        <MenuButton isOpen={true} onClick={onClose} />
      </MenuButtonWrapper>

      <LineFromButton />

      <CurveLine viewBox="0 0 400 800" preserveAspectRatio="none">
        <path
          d="M 70 130 Q 70 400, 300 400 Q 70 400, 70 670"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
        />
      </CurveLine>

      <MenuList>
        <MenuItem onClick={() => handleNavigate('/')}>
          <Dot />
          <MenuText>HOME</MenuText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/portfolio')}>
          <Dot />
          <MenuText>포트폴리오</MenuText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/info')}>
          <Dot />
          <MenuText>INFO</MenuText>
        </MenuItem>
      </MenuList>
    </Overlay>
  )
}

export default ToggleMenu
