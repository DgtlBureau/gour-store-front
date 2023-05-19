import React from 'react';

import {Breadcrumbs} from '@mui/material';
import {LinkRef as Link} from '../../components/UI/Link/Link';
import {Path} from '../../constants/routes';

import {Typography} from '../../components/UI/Typography/Typography';

import {useLocalTranslation} from '../../hooks/useLocalTranslation';

import translations from './Delivery.i18n.json';

import {ShopLayout} from 'layouts/Shop/Shop';
import {Box} from '../../components/UI/Box/Box';
import Image from 'next/image';

import sxDelivery from './Delivery.styles';
import oleg from '../../assets/images/delivery/olegcalling.png'
import step1 from '../../assets/images/delivery/1step.svg'
import step2 from '../../assets/images/delivery/2step.svg'
import step3 from '../../assets/images/delivery/3step.svg'
import step4 from '../../assets/images/delivery/4step.svg'
import time from '../../assets/images/delivery/time.svg'

import cash from '../../assets/images/delivery/cash.svg'
import bank from '../../assets/images/delivery/bank.svg'
import order from '../../assets/images/delivery/order.svg'


export function Delivery() {
    const {t} = useLocalTranslation(translations);

    return (
        <ShopLayout>
            <Breadcrumbs sx={{marginBottom: '20px'}} separator=">" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Главная
                </Link>
                <Typography variant="h6" sx={{fontWeight: 700}}>Доставка и оплата</Typography>
            </Breadcrumbs>

            <Box sx={sxDelivery.banner}>
                <Typography variant="body2" sx={sxDelivery.banner.text}>{t('bannerTitle')}</Typography>
                <img style={sxDelivery.banner.img} src={oleg} alt={oleg} width="auto" height="auto"/>
            </Box>

            <Typography variant="h3" sx={sxDelivery.howWeWork}>{t('howWeWork')}</Typography>

            <Box sx={sxDelivery.containerHow}>
                <div style={sxDelivery.wrapperHow}>
                    <Box sx={sxDelivery.cardHow}>
                        <img src={step1} alt={step1} width="auto" height="auto"/>
                    </Box>
                    <Typography sx={sxDelivery.textHow} variant="body1">
                        {t('step1')}
                    </Typography>
                </div>
                <div style={sxDelivery.wrapperHow}>
                    <Box sx={sxDelivery.cardHow}>
                        <img src={step2} alt={step2} width="auto" height="auto"/>
                    </Box>
                    <Typography sx={sxDelivery.textHow} variant="body1">
                        {t('step2')}
                    </Typography>
                </div>
                <div style={sxDelivery.wrapperHow}>
                    <Box sx={sxDelivery.cardHow}>
                        <img src={step3} alt={step3} width="auto" height="auto"/>
                    </Box>
                    <Typography sx={sxDelivery.textHow} variant="body1">
                        {t('step3')}
                    </Typography>
                </div>
                <div style={sxDelivery.wrapperHow}>
                    <Box sx={sxDelivery.last}>
                        <img src={step4} alt={step4} width="auto" height="auto"/>
                    </Box>
                    <Typography sx={sxDelivery.textHow} variant="body1">
                        {t('step4')}
                    </Typography>
                </div>
            </Box>

            <Box sx={sxDelivery.containerDelivery}>
                <Typography sx={sxDelivery.deliverySP}>{t('deliverySPHead')}</Typography>
                <Typography sx={sxDelivery.deliverySPText}>{t('deliverySPText')}</Typography>
            </Box>

            <Box sx={sxDelivery.containerDelivery}>
                <Box sx={sxDelivery.cardTime}>
                    <Typography sx={sxDelivery.deliveryTimeText}>{t('deliveryTime')}</Typography>
                    <Image src={time} alt={time} width={50} height={50}/>
                </Box>
                <Typography sx={sxDelivery.deliveryCond}>{t('deliveryCond')}</Typography>
            </Box>

            <Box sx={sxDelivery.containerPrice}>
                <Typography sx={sxDelivery.price}>{t('price')}</Typography>
                <Box sx={sxDelivery.containerCad}>
                    <Box sx={sxDelivery.deliveryCadWrapper}>
                        <Typography sx={sxDelivery.deliveryCad}>{t('1cad')}</Typography>
                        <Typography sx={sxDelivery.deliveryCadText}>{t('1cadText')}</Typography>
                    </Box>
                    <Box sx={sxDelivery.deliveryCadWrapper}>
                        <Typography sx={sxDelivery.deliveryCad}>{t('2cad')}</Typography>
                        <Typography sx={sxDelivery.deliveryCadText}>{t('2cadText')}</Typography>
                    </Box>
                    <Box sx={sxDelivery.deliveryCadWrapper}>
                        <Typography sx={sxDelivery.deliveryCad}>{t('3cad')}</Typography>
                        <Typography sx={sxDelivery.deliveryCadText}>{t('3cadText')}</Typography>
                    </Box>
                </Box>
            </Box>

            <Typography sx={sxDelivery.paymentHead}>{t('paymentHead')}</Typography>
            <Box sx={sxDelivery.containerPayment}>
                <Box sx={sxDelivery.paymentCard}>
                    <Image sx={sxDelivery.paymentCardImg} src={cash} alt={cash} width={100} height={100}/>
                    <Typography sx={sxDelivery.paymentCardHead}>{t('cashHead')}</Typography>
                    <Typography sx={sxDelivery.paymentCardText}>{t('cashText')}</Typography>
                </Box>
                <Box sx={sxDelivery.paymentCard}>
                    <Image sx={sxDelivery.paymentCardImg} src={bank} alt={bank} width={100} height={100}/>
                    <Typography sx={sxDelivery.paymentCardHead}>{t('bankHead')}</Typography>
                    <Typography sx={sxDelivery.paymentCardText}>{t('bankText')}</Typography>
                </Box>
                <Box sx={sxDelivery.paymentCard}>
                    <Image sx={sxDelivery.paymentCardImg} src={order} alt={order} width={100} height={100}/>
                    <Typography sx={sxDelivery.paymentCardHead}>{t('orderHead')}</Typography>
                    <Typography sx={sxDelivery.paymentCardText}>{t('orderText')}</Typography>
                </Box>
            </Box>
        </ShopLayout>
    );
}

export default Delivery;
