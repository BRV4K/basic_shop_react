import {getProduct, getSize} from "../../services/api";
import {useState} from "react";
import {deleteProduct} from "../../redux/basket/basket";
import {useDispatch} from "react-redux";

export default function ProductViewBasket(props) {
    const dispatch = useDispatch();

    const product_id = props.product_id;
    const size_id = props.size_id;
    const color_id = props.color_id;

    const [productApi, setProductApi] = useState();
    const [sizeApi, setSizeApi] = useState();
    console.log(sizeApi);

    getProduct(product_id).then(resolve =>
    {
        setProductApi(resolve);
    });
    getSize(size_id).then(resolve =>
    {
        setSizeApi(resolve);
    });

    if (productApi && sizeApi) {
        return (<>
            <div className='w-100 border border-secondary border-2 rounded mb-3 d-flex p-3 justify-content-start position-relative'>
                <div className='w-25'>
                    <img src={productApi.colors.find(color => color.id === color_id).images[0]} className='w-100'/>
                </div>
                <div className='ms-5'>
                    <p className='fs-3 fw-bolder'>{productApi.name}</p>
                    <p>Размер: {sizeApi.label}</p>
                    <p>Цвет: {productApi.colors.find(color => color.id === color_id).name}</p>
                    <p>Цена: {productApi.colors.find(color => color.id === color_id).price}$</p>
                </div>
                <div className='position-absolute bottom-0 end-0 mb-3 me-3'>
                    <button className='btn btn-danger' onClick={() => {
                        dispatch(deleteProduct(props.basket_id));
                    }}>Удалить товар</button>
                </div>
            </div>
        </>)
    }
    else {
        return <p>Данные загружаются</p>
    }

}