import Image from 'next/image';
import React from 'react';

import {Box} from 'components/UI/Box/Box';
import {Typography} from 'components/UI/Typography/Typography';

import quality from 'assets/icons/whyUs/quality.svg';
import loyalty from 'assets/icons/whyUs/loyalty.svg';
import time from 'assets/icons/whyUs/time.svg';

import {useLocalTranslation} from 'hooks/useLocalTranslation';
import translations from 'components/WhyUs/WhyUs.i18n.json';

const sx = {
    card: {
        fontFamily: 'Roboto slab',
        backgroundColor: '#FBF4E6',
        boxSizing: 'border-box',
        padding: '25px',
        whiteSpace: 'pre-line',
        border: '2px solid',
        borderColor: 'rgba(126, 95, 47, 0.2);',
        width: 'auto',
        height: 'auto',
        color: '#7E5F2F',
        borderRadius: '20px',
        transition: '0.4s',
        flexBasis: {
            xs: '100%',
            md: '33%',
        },
        head: {
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: '1000',
            fontSize: '28px',
            lineHeight: '120%',
            marginTop: '15px',
            marginBottom: '15px',
        },
        text: {
            fontWeight: '400',
            fontSize: '15px',
            lineHeight: '19px',
            textDecoration: 'none',
            justifyContent: 'space-between',
            wordWrap: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
        },
    },
    whyUs: {
        fontWeight: '800',
        fontSize: '40px',
        lineHeight: '110%',
        color: '#7E5F2F',
        marginTop: '10%',
        marginBottom: '5%',
    },
    container: {
        gap: '20px',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
        },
        justifyContent: 'space-between',
    }
};


type ContactCardProps = {
    text: string;
    head: string;
    icon: string;
};

export function WhyUs() {
    const {t} = useLocalTranslation(translations);

    return (
        <Box>
            <Typography variant="h4" sx={sx.whyUs}>
                {t('title')}
            </Typography>
            <Box sx={sx.container}>
                <Box sx={sx.card}>
                    <Image src={quality} height={55} width={55} alt="tel"/>
                    <Typography variant="h4" sx={sx.card.head}>
                        {t('qualityHead')}
                    </Typography>
                    <Box sx={sx.card.text}>
                        {t('qualityText')}
                    </Box>
                </Box>
                <Box sx={sx.card}>
                    <Image src={time} height={55} width={55} alt="tel"/>
                    <Typography variant="h4" sx={sx.card.head}>
                        {t('timeHead')}
                    </Typography>
                    <Box sx={sx.card.text}>
                        {t('timeText')}
                    </Box>
                </Box>
                <Box sx={sx.card}>
                    <Image src={loyalty} height={55} width={55} alt="tel"/>
                    <Typography variant="h4" sx={sx.card.head}>
                        {t('loyaltyHead')}
                    </Typography>
                    <Box sx={sx.card.text}>
                        {t('loyaltyText')}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
