import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

Wellcome.propTypes = {
    toAds: PropTypes.func.isRequired,
}

export default function Wellcome({toAds}) {
    return (
        <WrapperWellcome>
            <Text>
            Hi, I'm glad you chose us as your Ad-Server! 
            click on the "show ads" button to continue. 
            </Text>
            <Button onClick={toAds}>show ads</Button>
        </WrapperWellcome>
    )
}

const WrapperWellcome = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 30px;
    text-align: center;
    height: 100vh;
`
const Text = styled.h2`
    color: red;
`
const Button = styled.button`
font-weight: 300;
letter-spacing: 0.1rem;
font-size: 1.5rem;
border: none;
padding: 12px;
cursor: pointer;
color: white;
background: black;
`