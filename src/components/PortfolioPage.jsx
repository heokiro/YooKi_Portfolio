import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuButton from './common/MenuButton'
import ToggleMenu from './common/ToggleMenu'
import CategoryTabs from './common/CategoryTabs'
import { getContent } from '../utils/contentLoader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  position: relative;
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #000;
  padding: 40px;
  display: flex;
  align-items: flex-start;
  gap: 40px;
`

const MenuButtonWrapper = styled.div`
  flex-shrink: 0;
`

const LineFromMenu = styled.div`
  position: absolute;
  top: 100px;
  left: 69px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 2px;
    height: 30px;
    background: #fff;
    position: absolute;
    top: -30px;
    left: 0;
  }

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: transparent;
    margin-left: -5px;
  }
`

const HorizontalLine = styled.div`
  position: absolute;
  top: 130px;
  left: 69px;
  right: 0;
  height: 2px;
  background: #fff;
`

const TabsWrapper = styled.div`
  padding-top: 10px;
  padding-left: 120px;
`

const Content = styled.main`
  padding-top: 180px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 60px;
`

const ListView = styled.div`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: relative;

  &:hover {
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #fff;
  }
`

const ListDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
  margin-right: 30px;
  flex-shrink: 0;
`

const ListTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.02em;
`

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FolderCard = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    opacity: 0.8;
  }
`

const FolderIcon = styled.svg`
  width: 100%;
  aspect-ratio: 1.2;
`

const FolderTitle = styled.p`
  margin-top: 16px;
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
`

function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()
  const content = getContent()

  const filteredPortfolios = useMemo(() => {
    if (!content.portfolios) return []
    if (activeCategory === 'All') return content.portfolios
    return content.portfolios.filter(p => p.category === activeCategory)
  }, [content.portfolios, activeCategory])

  const handlePortfolioClick = (id) => {
    navigate(`/portfolio/${id}`)
  }

  return (
    <Container>
      <Header>
        <MenuButtonWrapper>
          <MenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
        </MenuButtonWrapper>
        <LineFromMenu />
        <HorizontalLine />
        <TabsWrapper>
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </TabsWrapper>
      </Header>

      <Content>
        {activeCategory === 'All' ? (
          <ListView>
            {filteredPortfolios.map(portfolio => (
              <ListItem
                key={portfolio.id}
                onClick={() => handlePortfolioClick(portfolio.id)}
              >
                <ListDot />
                <ListTitle>{portfolio.title.replace('\n', ' ')}</ListTitle>
              </ListItem>
            ))}
          </ListView>
        ) : (
          <GridView>
            {filteredPortfolios.map(portfolio => (
              <FolderCard
                key={portfolio.id}
                onClick={() => handlePortfolioClick(portfolio.id)}
              >
                <FolderIcon viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 25 L10 90 Q10 95 15 95 L105 95 Q110 95 110 90 L110 25 Q110 20 105 20 L55 20 L45 10 L15 10 Q10 10 10 15 L10 25 Z"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                  />
                </FolderIcon>
                <FolderTitle>{portfolio.title.replace('\n', ' ')}</FolderTitle>
              </FolderCard>
            ))}
          </GridView>
        )}
      </Content>

      <ToggleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Container>
  )
}

export default PortfolioPage
