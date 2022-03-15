import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {selectIsAuth} from "../store/selectors/auth";
import {useSelector} from "react-redux";
import {useGetCurrentUserQuery} from "../store/api/userApi";
import {useGetProductListQuery} from "../store/api/productApi";

const Home: NextPage = () => {
    const {data: products} = useGetProductListQuery();
  return (
    <div>
        {JSON.stringify(products)}
      INDEX
    </div>
  )
}

export default Home
