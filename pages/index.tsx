import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {useGetNoveltiesProductListQuery, useGetProductListQuery} from "../store/api/productApi";
import {ShopLayout} from "../layouts/ShopLayout";
import {CardSlider} from "../components/CardSlider/CardSlider";
import {ProductCard} from "../components/Product/Card/Card";
import {useGetPromotionListQuery} from "../store/api/promotionApi";
import {PromotionCard} from "../components/PromotionCard/PromotionCard";
import {
    addBasketProduct,
    selectProductsIdInOrder, selectProductsInOrder, subtractBasketProduct
} from "../store/slices/orderSlice";
import s from './index.module.scss';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const {data: products} = useGetProductListQuery();
    const {data: novelties} = useGetNoveltiesProductListQuery();
    const {data: promotions} = useGetPromotionListQuery();
    const currentLanguage = 'en';
    const currentCurrency = 'eur';
    const productsIdInOrder = useSelector(selectProductsIdInOrder);
    const productsInOrder = useSelector(selectProductsInOrder);

    if (!products || !promotions || !novelties) {
        return <div/>
    }
    return (
        <ShopLayout>
            <div>
                <div>
                    <CardSlider
                        title={'Акции и скидки'}
                        cardsList={promotions.map(promotion => <PromotionCard
                            title={promotion?.title?.ru || 'X'}
                            key={promotion.id}
                            image={promotion.cardImage.small}
                            onMoreCLick={() => {}}
                        />)}
                    />
                </div>
                <div className={s.infoBlock}>
                    <CardSlider
                        title="Новинки"
                        cardsList={novelties.map(product => <ProductCard
                            key={product.id}
                            title={product.title ? product.title[currentLanguage] : ''}
                            description={product.description ? product.description[currentLanguage] : ''}
                            rating={product.grade}
                            currentWeight={productsInOrder.find(it => it.product.id === product.id)?.weight || 0}
                            price={product.price[currentCurrency]}
                            cost={'200 руб'}
                            previewSrc={product.images[0] ? product.images[0].small : ''}
                            inCart={productsIdInOrder.includes(product.id)}
                            isElected={false}
                            onAdd={() => {
                                dispatch(addBasketProduct(product))
                            }}
                            onSubtract={() => {
                                dispatch(subtractBasketProduct(product))
                            }}
                            onRemove={() => {
                            }}
                            onEdit={() => {
                            }}
                            onElect={() => {
                            }}
                            onDetail={() => {
                            }}
                        />)}
                    />
                </div>
                <div className={s.infoBlock}>
                    <CardSlider
                        title={'sada'}
                        cardsList={products.map(product => <ProductCard
                            key={product.id}
                            title={product.title ? product.title[currentLanguage] : ''}
                            description={product.description ? product.description[currentLanguage] : ''}
                            rating={product.grade}
                            price={product.price[currentCurrency]}
                            cost={'200 руб'}
                            previewSrc={product.images[0] ? product.images[0].small : ''}
                            inCart={false}
                            isElected={false}
                            onAdd={() => {
                                dispatch(addBasketProduct(product))
                            }}
                            onRemove={() => {
                            }}
                            onEdit={() => {
                            }}
                            onElect={() => {
                            }}
                            onDetail={() => {
                            }}
                        />)}
                    />
                </div>
            </div>
        </ShopLayout>
    )
}

export default Home
