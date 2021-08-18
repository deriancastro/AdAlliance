import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

DetailsPage.propTypes = {
    currentAd: PropTypes.objectOf(
        PropTypes.shape({
            currentLink: PropTypes.string, 
        })
    ),
    toHome: PropTypes.func.isRequired,
}

export default function DetailsPage({currentAd, toHome}) {
    const {currentLink} = currentAd; 

    return (
        <WrapperDetail>
            <Button onClick={toHome}>back</Button>
            <Detail src={currentLink} width="800" height="500"></Detail> 
        </WrapperDetail>
         
    )
}


const WrapperDetail = styled.div`
    Display: grid;
    gap: 30px;
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
const Detail = styled.iframe`
    margin: 0 auto;
    color: black;
`