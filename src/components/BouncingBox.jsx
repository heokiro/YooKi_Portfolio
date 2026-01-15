import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`

function BouncingBox({ onPositionChange }) {
  const boxRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 2, y: 2 })

  useEffect(() => {
    const box = boxRef.current
    if (!box) return

    const boxSize = 200
    
    // 초기 위치를 랜덤하게 설정
    const initialX = Math.random() * (window.innerWidth - boxSize)
    const initialY = Math.random() * (window.innerHeight - boxSize)
    positionRef.current = { x: initialX, y: initialY }
    box.style.left = `${initialX}px`
    box.style.top = `${initialY}px`

    // 랜덤한 초기 속도 설정
    velocityRef.current = {
      x: (Math.random() - 0.5) * 27 + 1,
      y: (Math.random() - 0.5) * 27 + 1,
    }

    let animationFrameId

    const animate = () => {
      const { x, y } = positionRef.current
      const { x: vx, y: vy } = velocityRef.current

      // 새로운 위치 계산
      let newX = x + vx
      let newY = y + vy

      const boxSize = 200
      
      // 경계 감지 및 반사
      if (newX <= 0 || newX >= window.innerWidth - boxSize) {
        velocityRef.current.x = -velocityRef.current.x
        newX = Math.max(0, Math.min(window.innerWidth - boxSize, newX))
      }

      if (newY <= 0 || newY >= window.innerHeight - boxSize) {
        velocityRef.current.y = -velocityRef.current.y
        newY = Math.max(0, Math.min(window.innerHeight - boxSize, newY))
      }

      // 위치 업데이트
      positionRef.current = { x: newX, y: newY }
      box.style.left = `${newX}px`
      box.style.top = `${newY}px`

      // 부모 컴포넌트에 위치 전달
      if (onPositionChange) {
        onPositionChange({ x: newX, y: newY })
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 리사이즈 이벤트 처리
    const handleResize = () => {
      const boxSize = 200
      // 화면 크기가 변경되면 위치 조정
      positionRef.current.x = Math.min(
        positionRef.current.x,
        window.innerWidth - boxSize
      )
      positionRef.current.y = Math.min(
        positionRef.current.y,
        window.innerHeight - boxSize
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <Box ref={boxRef} />
}

export default BouncingBox

