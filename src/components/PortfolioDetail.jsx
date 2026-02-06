import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuButton from './common/MenuButton'
import ToggleMenu from './common/ToggleMenu'
import CategoryTabs from './common/CategoryTabs'
import { getContent } from '../utils/contentLoader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.$layoutType === 'text' ? '#fff' : '#000'};
  color: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
  position: relative;
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: ${props => props.$layoutType === 'text' ? '#fff' : '#000'};
  padding: 40px;
  display: flex;
  align-items: flex-start;
  gap: 40px;
`

const MenuButtonWrapper = styled.div`
  flex-shrink: 0;

  button {
    border-color: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
  }

  span {
    background: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
  }
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
    background: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
    position: absolute;
    top: -30px;
    left: 0;
  }

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
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
  background: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
`

const TabsWrapper = styled.div`
  padding-top: 10px;
  padding-left: 120px;

  button {
    color: ${props => props.$layoutType === 'text' ? '#666' : '#666'};

    &:hover {
      color: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
    }
  }
`

const CloseButton = styled.button`
  position: fixed;
  top: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    background: ${props => props.$layoutType === 'text' ? '#000' : '#fff'};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    opacity: 0.7;
  }
`

const Content = styled.main`
  padding-top: 180px;
  padding-bottom: 80px;
`

const PhotoLayout = styled.div`
  display: flex;
  gap: 60px;
  padding: 0 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const ImageSection = styled.div`
  flex: 2;
`

const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: #333;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: #999;
`

const InfoSection = styled.div`
  flex: 1;
  position: sticky;
  top: 200px;
  align-self: flex-start;
`

const ProjectTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.3;
`

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  white-space: pre-wrap;
`

const AdditionalImages = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const AdditionalImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: #333;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TextLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;
`

const TextTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
`

const TextIntro = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 60px;
`

const TwoColumnText = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ColumnText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
`

const BottomImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BottomImage = styled.div`
  aspect-ratio: 4/3;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

function PortfolioDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const content = getContent()

  const portfolio = useMemo(() => {
    if (!content.portfolios) return null
    return content.portfolios.find(p => p.id === parseInt(id))
  }, [content.portfolios, id])

  const [activeCategory, setActiveCategory] = useState(portfolio?.category || 'All')

  if (!portfolio) {
    return (
      <Container $layoutType="photo">
        <Content>
          <p style={{ textAlign: 'center', padding: '100px' }}>
            포트폴리오를 찾을 수 없습니다.
          </p>
        </Content>
      </Container>
    )
  }

  const layoutType = portfolio.layoutType || 'photo'

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    navigate('/portfolio')
  }

  return (
    <Container $layoutType={layoutType}>
      <Header $layoutType={layoutType}>
        <MenuButtonWrapper $layoutType={layoutType}>
          <MenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
        </MenuButtonWrapper>
        <LineFromMenu $layoutType={layoutType} />
        <HorizontalLine $layoutType={layoutType} />
        <TabsWrapper $layoutType={layoutType}>
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </TabsWrapper>
      </Header>

      <CloseButton
        $layoutType={layoutType}
        onClick={() => navigate('/portfolio')}
        aria-label="닫기"
      />

      <Content>
        {layoutType === 'photo' ? (
          <>
            <PhotoLayout>
              <ImageSection>
                <MainImage>
                  {portfolio.image && (
                    <img src={portfolio.image} alt={portfolio.title} />
                  )}
                </MainImage>
                <ImageCaption>
                  {portfolio.imageDescription || '이미지 설명'}
                </ImageCaption>
              </ImageSection>
              <InfoSection>
                <ProjectTitle>{portfolio.title.replace('\n', ' ')}</ProjectTitle>
                <ProjectDescription>
                  {portfolio.description || '프로젝트 상세 설명이 여기에 표시됩니다.'}
                </ProjectDescription>
              </InfoSection>
            </PhotoLayout>
            {portfolio.images && portfolio.images.length > 0 && (
              <AdditionalImages style={{ padding: '0 60px' }}>
                {portfolio.images.map((img, index) => (
                  <AdditionalImage key={index}>
                    <img src={img} alt={`${portfolio.title} ${index + 1}`} />
                  </AdditionalImage>
                ))}
              </AdditionalImages>
            )}
          </>
        ) : (
          <TextLayout>
            <TextTitle>{portfolio.title.replace('\n', ' ')}</TextTitle>
            <TextIntro>
              {portfolio.description || '프로젝트 소개 텍스트가 여기에 표시됩니다.'}
            </TextIntro>
            <TwoColumnText>
              <ColumnText>
                {portfolio.leftColumnText || '왼쪽 컬럼 텍스트가 여기에 표시됩니다. 프로젝트의 배경, 목표, 과정 등을 설명할 수 있습니다.'}
              </ColumnText>
              <ColumnText>
                {portfolio.rightColumnText || '오른쪽 컬럼 텍스트가 여기에 표시됩니다. 프로젝트의 결과, 성과, 배운 점 등을 설명할 수 있습니다.'}
              </ColumnText>
            </TwoColumnText>
            <BottomImages>
              {(portfolio.images || [portfolio.image]).slice(0, 4).map((img, index) => (
                <BottomImage key={index}>
                  {img && <img src={img} alt={`${portfolio.title} ${index + 1}`} />}
                </BottomImage>
              ))}
            </BottomImages>
          </TextLayout>
        )}
      </Content>

      <ToggleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Container>
  )
}

export default PortfolioDetail
