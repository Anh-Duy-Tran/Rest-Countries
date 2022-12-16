import Navbar from "../../components/Navbar";
import styled from 'styled-components';
import CountryCard from "../../components/Country";

const Container = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  margin-top: 90px;
  display : flex;
  justify-content: center;
  align-items: center;
  width : 80%;
  min-width : 800px;
`

const Country = () => {
  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <CountryCard/>
      </Wrapper>
    </Container>
  )
}

export default Country;