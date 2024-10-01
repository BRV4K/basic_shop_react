import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ProductViewBasket from "../../components/ProductViewBasket/ProductViewBasket";

export default function Basket() {
    const basket = useSelector(state => state.basket.basket);
     return (
         <>
             <div className='d-flex flex-column justify-content-center align-items-center mt-5 position-relative mx-5'>
                 <p className='fs-1'>Корзина</p>
                 <div className='w-50'>
                     {basket.length === 0 ? <p className='d-flex justify-content-center align-items-center'>В коризине пока пусто</p> :
                     basket.map((product, index) => {
                         return (<ProductViewBasket product_id={product.product_id} size_id={product.size_id} color_id={product.color_id} basket_id={index}/>)
                     })}
                 </div>
                 <div className='position-absolute top-0 start-0'>
                     <Link to={'/'}>
                         <button className='btn btn-outline-secondary fs-6'>На главную</button>
                     </Link>
                 </div>
             </div>
         </>
     )
}