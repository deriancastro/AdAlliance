import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Position1 from './components/Position1';
import Position2 from './components/Position2';

Home.propTypes = {
    data1: PropTypes.arrayOf(
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
    data2: PropTypes.arrayOf(
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
}

export default function Home({data1, data2, onDetail}) {

    const {image:image1, link:link1, height:height1, width:width1} = data1;
    const {image:image2, link:link2, height:height2, width:width2} = data2;

    return (
        <WraperHome>
            <Position1 image={image1} link={link1} height={height1} width={width1} onDetail={onDetail} />
            <Position2 image={image2} link={link2} height={height2} width={width2} onDetail={onDetail} />
        </WraperHome>
    )
}

const WraperHome = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 100vh;
`
