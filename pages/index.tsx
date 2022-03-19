import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {selectIsAuth} from "../store/selectors/auth";
import {useSelector} from "react-redux";
import {useGetCurrentUserQuery} from "../store/api/userApi";
import {useGetProductListQuery} from "../store/api/productApi";
import {ShopLayout} from "../layouts/ShopLayout";
import {CardSlider} from "../components/CardSlider/CardSlider";
import {ProductCard} from "../components/Product/Card/Card";
import {TemplateCard} from "../components/CardSlider/CardSlider.stories";
import {useGetPromotionListQuery} from "../store/api/promotionApi";
import {PromotionCard} from "../components/PromotionCard/PromotionCard";

const Home: NextPage = () => {
    const {data: products} = useGetProductListQuery();
    const {data: promotions} = useGetPromotionListQuery();
    const currentLanguage = 'en';
    const currentCurrency = 'eur';
    if (!products || !promotions) {
        return <div/>
    }
    return (
        <ShopLayout>
            <div>
                <CardSlider
                    title={'sada'}
                    cardsList={promotions.map(promotion => <PromotionCard
                        key={promotion.id}
                        image={promotion.cardImage.small}
                        onClickMore={() => {
                        }}
                    />)}
                />
                <CardSlider
                    title={'sada'}
                    cardsList={products.map(product => <ProductCard
                        key={product.id}
                        title={product.title ? product.title[currentLanguage] : ''}
                        description={product.description ? product.description[currentLanguage] : ''}
                        rating={product.grade}
                        weights={[{value: 100, unit: 'г'}]}
                        price={product.price[currentCurrency]}
                        cost={''}
                        previewSrc={product.images[0] ? product.images[0].small : ''}
                        inCart={false}
                        isElected={false}
                        onAdd={() => {
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
        </ShopLayout>
    )
}

export default Home
