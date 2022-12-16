import Navbar from "../../components/Navbar";
import styled from 'styled-components';
import Countries from "../../components/Countries";

const Container = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  width : 80%;
  min-width : 800px;
`

const Mainpage = () => {
  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <Countries/>
      </Wrapper>
    </Container>
  )
}

export default Mainpage;