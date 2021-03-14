import React, { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../../contexts/AuthContext'

const Element = styled.div`
  width: 1000px;
  min-height: 400px;
  margin: 20px auto;
  padding: 10px 30px;
  background-color: #fafafa;
`
const NewsWrapper = styled.div`
  width: 1000px;
  margin: 20px auto;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const News = styled.div`
  width: 47.5%;
  border: 1px solid black;

  :nth-child(n + 3) {
    margin-top: 5%;
  }
`
const Img = styled.img`
  display: block;
  width: 100%;
`
const ContentWrapper = styled.div`
  padding: 10px;
`

export default function Content() {
  const { news } = useContext(AuthContext)

  if (!news) {
    return (
      <Element>
        <h1>Neto Social</h1>
        <h3>Facebook and VK Killed</h3>
      </Element>
    )
  }

  return (
    <NewsWrapper>
      {news.map((newsItem) => (
        <News key={newsItem.id}>
          <Img src={newsItem.image} alt={newsItem.title} />
          <ContentWrapper>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.content}</p>
          </ContentWrapper>
        </News>
      ))}
    </NewsWrapper>
  )
}
