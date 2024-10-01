import {Link} from "react-router-dom";


export default function ProductViewMain(props) {
    const product = props.product;

    return (
        <>
            <div className='border border-secondary border-2 rounded p-4'>
                <Link to={{
                    pathname: `/${product.id}`,
                    product: product
                }} className='text-decoration-none text-dark'>
                    <div className='d-flex flex-column justify-contenct-center align-items-center'>
                        <img src={product.colors[0].images[0]} style={{'width': '300px'}}/>
                        <p className='text-decoration-none fs-4'>{product.name}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}