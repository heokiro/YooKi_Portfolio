import styled from 'styled-components'

const TabsContainer = styled.div`
  display: flex;
  gap: 30px;
  padding-left: 20px;
`

const Tab = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.$active ? '#fff' : '#666'};
  font-size: 1rem;
  font-weight: ${props => props.$active ? '700' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 0;
  position: relative;
  letter-spacing: 0.05em;

  &:hover {
    color: #fff;
  }

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  `}
`

const categories = ['All', '전시', '강의', 'Unity', 'Arduino']

function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <TabsContainer>
      {categories.map(category => (
        <Tab
          key={category}
          $active={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Tab>
      ))}
    </TabsContainer>
  )
}

export default CategoryTabs
