import { ReactComponent as Star } from '../assets/img/details/star.svg'
export function StarsRating({rate}){

    function getStars(rate) {
        let stars = []
        for (let i = 0; i < rate; i++) {
            stars.push(<Star key={i} />)
        }
        return stars
    }


    return (
        <div className="reviewer-rate reviewer-item">{getStars(rate)} {rate}</div>
    )

}