import React, {useState} from 'react';

import {ShopLayout} from 'layouts/Shop/Shop';
import {Box} from 'components/UI/Box/Box';

import {ContactCard} from 'components/Contacts/ContactCard';
import {Typography} from 'components/UI/Typography/Typography';

import {useLocalTranslation} from 'hooks/useLocalTranslation';

import translations from './Contacts.i18n.json';

import sx from './Contacts.styles';

import iconMail from 'assets/icons/social/mail.svg';
import phone from 'assets/icons/social/phone.svg';
import tgIcon from 'assets/icons/social/tg.svg';
import vkIcon from 'assets/icons/social/vk.svg';
import {Breadcrumbs} from '@mui/material';
import {LinkRef as Link} from '../../components/UI/Link/Link';

export default function Contacts() {
    const {t} = useLocalTranslation(translations);
    const hrefTel = 'tel:+7 812 602-52-61';
    const hrefMail = 'mailto:rk@gour-food.com';
    const hrefVk = 'https://vk.com/tastyoleg';
    const hrefTg = 'https://t.me/tastyoleg';

    return (
        <ShopLayout>
            <Breadcrumbs sx={{marginBottom: '20px'}} separator=">" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Главная
                </Link>
                <Typography variant="h6" sx={{fontWeight: 700}}>Контакты</Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={sx.titleHead}>
                {t('title')}
            </Typography>
            <Box sx={sx.row}>
                <ContactCard icon={phone} text={t('textPhone')} hrefLink={hrefTel} textLink="+7 812 602-52-61"/>
                <ContactCard icon={tgIcon} text={t('textTg')} hrefLink={hrefTg} textLink="t.me/tastyoleg"/>
                <ContactCard icon={iconMail} text={t('textMail')} hrefLink={hrefMail} textLink="rk@gour-food.com"/>
                <ContactCard icon={vkIcon} text={t('textVk')} hrefLink={hrefVk} textLink="vk.com/tastyoleg"/>
            </Box>
        </ShopLayout>
    );
}
