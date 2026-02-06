import styled from 'styled-components'

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const IconWrapper = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Line = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;

  ${props => props.$isOpen && props.$position === 'top' && `
    transform: translateY(8px) rotate(45deg);
  `}

  ${props => props.$isOpen && props.$position === 'middle' && `
    opacity: 0;
  `}

  ${props => props.$isOpen && props.$position === 'bottom' && `
    transform: translateY(-8px) rotate(-45deg);
  `}
`

function MenuButton({ isOpen, onClick }) {
  return (
    <Button onClick={onClick} aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}>
      <IconWrapper>
        <Line $isOpen={isOpen} $position="top" />
        <Line $isOpen={isOpen} $position="middle" />
        <Line $isOpen={isOpen} $position="bottom" />
      </IconWrapper>
    </Button>
  )
}

export default MenuButton
