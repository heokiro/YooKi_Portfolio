import styled from 'styled-components'
import { getContent } from './utils/contentLoader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const content = getContent()

  return (
    <Container>
      {/* 포트폴리오 내용이 여기에 들어갈 예정입니다 */}
      {/* content 객체를 사용하여 동적으로 데이터를 표시할 수 있습니다 */}
    </Container>
  )
}

export default App