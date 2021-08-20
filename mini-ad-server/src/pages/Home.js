import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Position1 from '../components/Position1';
import Position2 from '../components/Position2';

Home.propTypes = {
    data1: PropTypes.objectOf(
        PropTypes.shape({
            advert_id: PropTypes.number,
            height: PropTypes.number,
            hour: PropTypes.number,
            image: PropTypes.string,
            link: PropTypes.string,
            position: PropTypes.number,
            priority: PropTypes.string,
            views: PropTypes.number,
            width: PropTypes.number,
        })
    ),
    data2: PropTypes.objectOf(
        PropTypes.shape({
            advert_id: PropTypes.number,
            height: PropTypes.number,
            hour: PropTypes.number,
            image: PropTypes.string,
            link: PropTypes.string,
            position: PropTypes.number,
            priority: PropTypes.string,
            views: PropTypes.number,
            width: PropTypes.number,
        })
    ),
    onDetail: PropTypes.func.isRequired,
    toWellcome: PropTypes.func.isRequired,
}

export default function Home({data1, data2, onDetail, toWellcome}) {

    const {image:image1, link:link1, height:height1, width:width1} = data1;
    const {image:image2, link:link2, height:height2, width:width2} = data2;

    return (
        <WrapperHome>
            <Button onClick={toWellcome}>back</Button>
            <WrapperPositions>
                <Position1 image={image1} link={link1} height={height1} width={width1} onDetail={onDetail} />
                <Position2 image={image2} link={link2} height={height2} width={width2} onDetail={onDetail} />
            </WrapperPositions>   
        </WrapperHome>
    )
}

const WrapperHome = styled.div`
    display:grid;
    gap 30px;
`
const WrapperPositions = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 50px;
    text-align: center;
    height: 100vh;
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
