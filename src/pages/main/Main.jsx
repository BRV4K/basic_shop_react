import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductViewMain from "../../components/ProductViewMain/ProductViewMain";
import { getProducts } from "../../services/api";
import async from "async";
import {setProducts} from "../../redux/products/products";
import {useEffect} from "react";
import BasketButton from "../../components/BasketButton/BasketButton";

export default function Main(props) {
    const products = useSelector(state => state.products.products);

    return (
         <>
             <div className='position-relative mt-5 d-flex justify-content-center align-items-center'>
                 <div className='d-flex gap-5 justify-content-center align-items-center w-75'>
                     {products ? products.map((product, index) => {
                         return (<ProductViewMain product={product} key={index}/>)
                     }): <p>Товары загружаются</p>}
                 </div>
                 <div className='position-absolute top-0 end-0 me-5'>
                     <BasketButton />
                 </div>
             </div>
         </>
     )
}