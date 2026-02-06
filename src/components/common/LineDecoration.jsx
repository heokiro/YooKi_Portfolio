import styled from 'styled-components'

const LineWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  pointer-events: none;
`

const VerticalLine = styled.div`
  position: absolute;
  top: 60px;
  left: 29px;
  width: 2px;
  height: ${props => props.$height || '40px'};
  background: #fff;
`

const HorizontalLine = styled.div`
  position: absolute;
  top: ${props => props.$top || '100px'};
  left: 29px;
  width: ${props => props.$width || '100px'};
  height: 2px;
  background: #fff;
`

const EndDot = styled.div`
  position: absolute;
  top: ${props => props.$top || '100px'};
  left: ${props => props.$left || '129px'};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
  transform: translate(-50%, -50%);
`

const FullWidthLine = styled.div`
  position: absolute;
  top: ${props => props.$top || '100px'};
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
`

function LineDecoration({
  variant = 'home',
  verticalHeight = '40px',
  horizontalWidth = '100px',
  showFullWidthLine = false
}) {
  if (variant === 'portfolio') {
    return (
      <LineWrapper>
        <VerticalLine $height={verticalHeight} />
        <HorizontalLine $top={`calc(60px + ${verticalHeight})`} $width={horizontalWidth} />
        <EndDot
          $top={`calc(60px + ${verticalHeight})`}
          $left={`calc(29px + ${horizontalWidth})`}
        />
        {showFullWidthLine && (
          <FullWidthLine $top={`calc(75px + ${verticalHeight})`} />
        )}
      </LineWrapper>
    )
  }

  return (
    <LineWrapper>
      <VerticalLine $height={verticalHeight} />
      <HorizontalLine $top={`calc(60px + ${verticalHeight})`} $width={horizontalWidth} />
      <EndDot
        $top={`calc(60px + ${verticalHeight})`}
        $left={`calc(29px + ${horizontalWidth})`}
      />
    </LineWrapper>
  )
}

export default LineDecoration
