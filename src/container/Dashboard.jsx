import { productlist } from '../data/ProductList';
import ProductCard from '../components/ProductCard';

export default function Dashboard  () {
    return (
        <div className='d-flex flex-wrap justify-content-center p-3'>
            {productlist.map((product)=> <ProductCard {...product}/>)}
        </div>
    )
}
