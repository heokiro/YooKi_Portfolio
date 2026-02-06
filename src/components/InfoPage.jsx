import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
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

const Title = styled.h1`
  position: absolute;
  top: 100px;
  left: 200px;
  font-size: 4rem;
  font-weight: 400;
  font-style: italic;
  margin: 0;
`

const LeftSection = styled.div`
  position: absolute;
  left: 60px;
  bottom: 80px;
`

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 30px;
`

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`

const IconWrapper = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

const scrollUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`

const RightSection = styled.div`
  position: absolute;
  right: 80px;
  top: 100px;
  bottom: 80px;
  width: 45%;
  overflow: hidden;
`

const ScrollingText = styled.div`
  animation: ${scrollUp} 60s linear infinite;
  animation-play-state: ${props => props.$paused ? 'paused' : 'running'};
`

const TextBlock = styled.div`
  padding: 40px 0;
  font-size: 1.1rem;
  line-height: 2;
  color: #ccc;

  h3 {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 8px;
    }
  }
`

function InfoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const infoContent = {
    name: 'Kiro',
    email: 'example@gmail.com',
    instagram: 'instagram_id',
    github: 'github_id',
    scrollText: [
      {
        title: '그동안 했던것들.',
        content: '정보나 이력들.....'
      },
      {
        title: '경력 및 활동',
        items: [
          '2024 - 현재: 프리랜서 개발자',
          '2023 - 2024: 인터랙티브 미디어 아트 전시',
          '2022 - 2023: 웹 개발 프로젝트',
          '2021 - 2022: 디자인 스튜디오 근무'
        ]
      },
      {
        title: '도움주신 사람들',
        items: [
          '이름 1',
          '이름 2',
          '이름 3'
        ]
      },
      {
        title: '사용 기술',
        items: [
          'React / JavaScript',
          'Unity / C#',
          'Arduino / Physical Computing',
          'Figma / Adobe Creative Suite'
        ]
      },
      {
        title: '연락처',
        content: '프로젝트 문의나 협업 제안은 이메일로 연락 부탁드립니다.'
      }
    ]
  }

  const renderScrollContent = () => {
    return infoContent.scrollText.map((section, index) => (
      <TextBlock key={index}>
        <h3>{section.title}</h3>
        {section.content && <p>{section.content}</p>}
        {section.items && (
          <ul>
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </TextBlock>
    ))
  }

  return (
    <Container>
      <MenuButtonWrapper>
        <MenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
      </MenuButtonWrapper>

      <LineDecoration variant="home" verticalHeight="40px" horizontalWidth="80px" />

      <Title>Info</Title>

      <LeftSection>
        <Name>{infoContent.name}</Name>
        <ContactList>
          <ContactItem href={`mailto:${infoContent.email}`}>
            <IconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6L12 13L2 6" />
              </svg>
            </IconWrapper>
            {infoContent.email}
          </ContactItem>
        </ContactList>
        <SocialIcons>
          <SocialIcon
            href={`https://instagram.com/${infoContent.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </SocialIcon>
          <SocialIcon
            href={`https://github.com/${infoContent.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </SocialIcon>
        </SocialIcons>
      </LeftSection>

      <RightSection
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <ScrollingText $paused={isPaused}>
          {renderScrollContent()}
          {renderScrollContent()}
        </ScrollingText>
      </RightSection>

      <ToggleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Container>
  )
}

export default InfoPage
