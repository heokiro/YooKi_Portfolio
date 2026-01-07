// 환경변수에 따라 content를 로드하는 유틸리티
import kiroContent from '../content/kiro/index.js'
import yooniContent from '../content/yooni/index.js'

// 환경변수 확인 및 디버깅
const PERSON = import.meta.env.VITE_PERSON || 'kiro'
console.log('VITE_PERSON:', import.meta.env.VITE_PERSON)
console.log('PERSON:', PERSON)
console.log('MODE:', import.meta.env.MODE)

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

export const getPerson = () => PERSON

export default getContent

