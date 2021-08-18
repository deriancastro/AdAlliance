import PropTypes from 'prop-types'
import styled from 'styled-components/macro';

Position2.propTypes = {
    image: PropTypes.string,
    link: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    onDetail: PropTypes.func.isRequired,
}

export default function  Position2({image, link, height, width, onDetail}) {
    return (
        <Image src={image} alt="" onClick={handleOnDetail} link={link} height={height} width={width} />
    )

    function handleOnDetail(){
        onDetail({currentLink: link})
    }
}

const Image = styled.img`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border: solid red 5px;
    border-radius: 10px;
`