import React from 'react';

import {Breadcrumbs} from '@mui/material';
import {LinkRef as Link} from '../../components/UI/Link/Link';
import {Path} from '../../constants/routes';
import {WhyUs} from 'components/WhyUs/WhyUs';

import {Typography} from '../../components/UI/Typography/Typography';

import {useLocalTranslation} from '../../hooks/useLocalTranslation';

import translations from './AboutUs.i18n.json';

import {ShopLayout} from 'layouts/Shop/Shop';
import {Box} from '../../components/UI/Box/Box';
import Image from 'next/image';

import sxAboutUs from './AboutUs.styles';
import oleg from '../../assets/images/aboutUs/oleg.svg';
import ch1 from '../../assets/images/aboutUs/cheese1.jpg';
import ch2 from '../../assets/images/aboutUs/cheese2.jpg';

import meat from '../../assets/images/aboutUs/meat.png';
import cheese from '../../assets/images/aboutUs/cheese.png';
import bacon from '../../assets/images/aboutUs/bacon.png';

export function AboutUs() {
    const {t} = useLocalTranslation(translations);

    return (
        <ShopLayout>
            <Breadcrumbs sx={{marginBottom: '20px'}} separator=">" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Главная
                </Link>
                <Typography variant="h6" sx={{fontWeight: 700}}>О компании</Typography>
            </Breadcrumbs>

            <Box sx={sxAboutUs.banner}>
                <Typography variant="body2" sx={sxAboutUs.banner.text}>{t('bannerTitle')}</Typography>
                <img style={sxAboutUs.banner.img} src={oleg} alt={oleg} width="auto" height="auto"/>
            </Box>

            <Typography variant="h3" sx={sxAboutUs.howWeWork}>{t('whatWeDo')}</Typography>

            <Box sx={sxAboutUs.containerDelivery}>
                <Box sx={sxAboutUs.containerBox}>
                    <Typography sx={sxAboutUs.deliverySP}>{t('whatWeDo1')}</Typography>
                    <Typography sx={sxAboutUs.deliveryCond}>{t('whoWe')}</Typography>
                </Box>
                {/* <Typography sx={sxAboutUs.deliverySPText}>{t('whatWeDo2')}</Typography> */}
                <img style={sxAboutUs.imageBox.img} src={ch1} alt={ch1} width={280} height={400} />
                <img style={sxAboutUs.imageBox.img} src={ch2} alt={ch2} width={280} height={340} />
            </Box>

            <WhyUs/>

            <Box sx={sxAboutUs.containerPrice}>
                <Typography sx={sxAboutUs.price}>{t('prod')}</Typography>
                <Box sx={sxAboutUs.containerCad}>
                    <Box sx={sxAboutUs.deliveryCadWrapper}>
                        <img style={sxAboutUs.imageInProd} src={cheese} alt={cheese} width={145} height={145} />
                        <Typography sx={sxAboutUs.deliveryCadText}>{t('1cheese')}</Typography>
                    </Box>
                    <Box sx={sxAboutUs.deliveryCadWrapper}>
                        <img style={sxAboutUs.imageInProd} src={meat} alt={meat} width={145} height={145} />
                        <Typography sx={sxAboutUs.deliveryCadText}>{t('2meat')}</Typography>
                    </Box>
                    <Box sx={sxAboutUs.deliveryCadWrapper}>
                        <img style={sxAboutUs.imageInProd} src={bacon} alt={bacon} width={145} height={145} />
                        <Typography sx={sxAboutUs.deliveryCadText}>{t('3beacon')}</Typography>
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
}

export default AboutUs;
