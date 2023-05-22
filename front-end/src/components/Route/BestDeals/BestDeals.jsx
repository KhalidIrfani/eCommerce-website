import React, { useEffect, useState } from 'react'
import styles from '../../../Style/style';
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../../redux/actions/product';


const BestDeals = () => {
    const [data, setData] = useState([]);
    const { allProducts } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getAllProducts());
        const allProductsData = allProducts ? [...allProducts] : [];
        const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
        const firstFive = sortedData && sortedData.slice(0, 5);
        setData(firstFive);
    }, [allProducts]);
    return (
        <>
            <div>
                <div className={`${styles.section}`}>
                    <div className={`${styles.heading}`}>
                        <h1>Best Deals</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                        {
                            data && data.length !== 0 && (
                                <>
                                    {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestDeals



