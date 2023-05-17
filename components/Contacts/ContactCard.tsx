import Image from 'next/image';
import React from 'react';

import {Box} from 'components/UI/Box/Box';
import {Typography} from 'components/UI/Typography/Typography';

import {LinkRef as Link} from '../UI/Link/Link';

const sx = {
    card: {
        fontFamily: 'Roboto slab',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        padding: '32px',
        border: '2px solid',
        borderColor: 'rgba(126, 95, 47, 0.2);',
        width: 'auto',
        height: 'auto',
        flexBasis: '24%',
        color: '#7E5F2F',
        borderRadius: '20px',
        transition: '0.4s',
        '@media (max-width: 574px)':{
            flexBasis: '100%',
        },
        '@media (max-width: 1023px)':{
            flexBasis: '49%',
        },
        '&:hover': {
            borderColor: 'rgba(126, 95, 47, 0.2);',
            backgroundColor: '#7E5F2F',
            color: '#ffffff',
            cursor: 'pointer',
            '& span': {
                color: '#ffffff',
                fontSize: '22px',
            },
            '& div': {
                '@media (min-width: 1024px)': {
                    display: 'none',
                }
            },
            '& p': {
                fontSize: '25px',
                color: '#ffffff',
            },
        },
        text: {
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: '1000',
            fontSize: '24px',
            lineHeight: '120%',
            marginTop: '30px',
            marginBottom: '70px',
            height: '55px',
        },
        textLink: {
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '28px',
            textDecoration: 'none',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
        },
        icon: {
            borderRadius: '100px',
            border: '2.2px solid rgba(126, 95, 47, 0.2)',
            padding: '10px',
            display: 'flex',
        },
    },
};

type ContactCardProps = {
    text: string;
    textLink: string;
    icon: string;
    hrefLink: string;
};

export function ContactCard({text, textLink, icon, hrefLink}: ContactCardProps) {
    return (
        <Box sx={sx.card}>
            <Link sx={sx.card.textLink} href={hrefLink} target="_blank">
                <Box sx={sx.card.icon}>
                    <Image src={icon} height={21} width={21} alt="tel"/>
                </Box>
                <Typography variant="h4" sx={sx.card.text}>
                    {text}
                </Typography>
                <span>
                    {textLink}
                </span>
            </Link>
        </Box>
    );
}
