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

export const getPerson = () => PERSON

export default getContent

