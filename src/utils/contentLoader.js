// 환경변수에 따라 content를 로드하는 유틸리티
import kiroContent from '../content/kiro/index.js'
import yooniContent from '../content/yooni/index.js'

const PERSON = import.meta.env.VITE_PERSON || 'kiro'

const contentMap = {
  kiro: kiroContent,
  yooni: yooniContent,
}

export const getContent = () => {
  const content = contentMap[PERSON]
  if (!content) {
    console.warn(`Unknown person: ${PERSON}, defaulting to kiro`)
    return contentMap.kiro
  }
  return content
}

// 랜덤 포트폴리오 선택
export const getRandomPortfolio = () => {
  const content = getContent()
  if (!content.portfolios || content.portfolios.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * content.portfolios.length)
  return content.portfolios[randomIndex]
}

export const getPerson = () => PERSON

export default getContent

