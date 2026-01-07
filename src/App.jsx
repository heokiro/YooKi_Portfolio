import styled from 'styled-components'
import { getContent } from './utils/contentLoader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
`

const Title = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin: 0;
`

function App() {
  const content = getContent()

  return (
    <Container>
      <Name>{content.name}</Name>
      <Title>{content.title}</Title>
      {/* 포트폴리오 내용이 여기에 들어갈 예정입니다 */}
    </Container>
  )
}

export default App