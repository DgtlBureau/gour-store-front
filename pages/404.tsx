import notFound from '../assets/images/404.png';
import Image from 'next/image';
import React from 'react';
import {Box} from '../components/UI/Box/Box';
import {Button} from '../components/UI/Button/Button';
import {useLocalTranslation} from '../hooks/useLocalTranslation';
import translations from './index.i18n.json';
import {Typography} from '../components/UI/Typography/Typography';
import {Link as CustomLink} from '../components/UI/Link/Link';
import {useRouter} from 'next/router';
import { ShopLayout } from '../layouts/Shop/Shop';

const sx = {
    notFound: {
        marginTop: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding:'0 20px'
    },
    title: {
        color: '#7E5F2F',
        fontWeight: '700',
        marginTop: '55px',
    },
    button: {
        margin: '45px 0',
    }
};

export default function NotFound() {
    const router = useRouter();
    const goToHome = () => router.push('/');

    const { t } = useLocalTranslation(translations);

    return <>
        <ShopLayout>
        <Box sx={sx.notFound}>
            <CustomLink path="/">
            <Image src={notFound} height="325" width="814" alt="notFound" />
            </CustomLink>
            <Typography variant={'h4'} sx={sx.title}>{t('notFound.message')}</Typography>
            <Button sx={sx.button} size={'medium'} onClick={goToHome} >{t('notFound.button')}</Button>
        </Box>
        </ShopLayout>
    </>
}
