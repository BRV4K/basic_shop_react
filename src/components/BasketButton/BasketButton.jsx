import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function BasketButton() {
    const basket = useSelector(state => state.basket.basket);

    return (
        <Link to={'/basket'}>
            <button className='btn btn-outline-primary'>{basket.length > 0 ? 'Корзина | ' + basket.length : 'Корзина'}</button>
        </Link>
    )
}