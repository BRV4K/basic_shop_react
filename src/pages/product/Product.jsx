import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast, Toaster} from "react-hot-toast";
import {addProduct} from '../../redux/basket/basket';
import BasketButton from "../../components/BasketButton/BasketButton";

export default function Product() {
    const { product_id } = useParams();
    const product = useSelector(state => state.products.products.find(product => product.id.toString() === product_id));
    const sizes = useSelector(state => state.sizes.sizes);
    const colors = product ? product.colors.map(color => color.name) : [];
    const [curImage, setCurImage] = useState(0);
    const [curColor, setCurColor] = useState('черный');
    const [choosenSize, setChoosenSize] = useState();
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket.basket);



    const colorTranslate = {
        'черный': 'black',
        'белый': 'white',
        'желтый': 'yellow',
        'серый': 'gray',
        'синий': 'blue'
    }

    const handleLeftArrowClick = () => {
        const imagesLen = product.colors.find(color => color.name === curColor).images.length
        if (curImage === 0) {
            setCurImage(imagesLen - 1);
        }
        else {
            setCurImage(curImage - 1);
        }
    }


    const handleRightArrowClick = () => {
        const imagesLen = product.colors.find(color => color.name === curColor).images.length;
        if (curImage === imagesLen - 1) {
            setCurImage(0);
        }
        else {
            setCurImage(curImage + 1);
        }
    }

    const handleClickColor = (color) => {
        setCurColor(color);
        setChoosenSize(undefined);
    }

    if (product) {
        return (
            <>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className='d-flex w-100 align-items-center justify-content-center position-relative'>
                    <div className='d-flex gap-2 flex-column w-50 justify-content-center align-items-center mt-5 h-100'>
                        <p className='fs-3'>{product.name}</p>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div onClick={handleLeftArrowClick}>
                                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <img src={product.colors.find(color => color.name === curColor).images[curImage]} className='w-25'/>
                            <div onClick={handleRightArrowClick}>
                                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <div className='d-flex gap-2 mt-2 mb-2'>
                            {colors.map((color, index) => {
                                return (<div onClick={() => handleClickColor(color)} key={index} className={curColor === color ? 'border border-info rounded-circle' : 'border border-dark rounded-circle'} style={{'backgroundColor': `${colorTranslate[color]}`, 'width': '30px', 'height': '30px'}}>
                                </div>)
                            })}
                        </div>

                        <div className='d-flex gap-2'>
                            {sizes.map((sizeApi, index) => {
                                return (<button onClick={
                                    product.colors.find(color => color.name === curColor).sizes.find(size => size === sizeApi.id) ?
                                        () => {
                                            choosenSize === sizeApi ? setChoosenSize(undefined) : setChoosenSize(sizeApi)
                                        } : () => toast('Данного размера нет в наличии')
                                }
                                                key={index}
                                                className={product.colors.find(color => color.name === curColor).sizes.find(size => size === sizeApi.id) !== undefined ?
                                                    sizeApi === choosenSize ? 'border-primary fs-3 p-2 border border-2 rounded bg-primary':
                                                        'border-primary fs-3 p-2 border border-2 rounded bg-light' :
                                                    'border-secondary fs-3 p-2 border border-2 rounded opacity-50 bg-light'}>
                                    {sizeApi.label}</button>)
                            })}
                        </div>

                        <p className='fs-3'>{product.colors.find(color => color.name === curColor).price}$</p>

                        <p className='fs-5'>{product.colors.find(color => color.name === curColor).description}</p>

                        <button className='btn btn-outline-primary' onClick={choosenSize ?
                            () => {
                                const product_id = product.id;
                                const size_id = choosenSize.id;
                                const color_id = product.colors.find(color => curColor === color.name).id;
                                if (basket.length > 0 && basket.find(basketProduct =>
                                    basketProduct.product_id === product_id &&
                                    basketProduct.size_id === size_id &&
                                    basketProduct.color_id === color_id)){

                                    toast('Товар с такими параметрами уже есть в корзине, выберите другой цвет, размер или товар')
                                }
                                else {
                                    dispatch(addProduct({product_id: product_id, size_id: size_id, color_id: color_id}))
                                }
                            }
                            : () => toast('Сначала выберите размер')}>Добавить в корзину</button>
                    </div>
                    <div className='position-absolute top-0 start-0 ms-5 mt-5'>
                        <Link to={'/'}>
                            <button className='btn btn-outline-secondary fs-6'>На главную</button>
                        </Link>
                    </div>
                    <div className='position-absolute top-0 end-0 me-5 mt-5'>
                        <BasketButton />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (<p>Данные загружаются</p>)
    }

}