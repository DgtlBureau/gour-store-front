import React from 'react';

import { Divider, List } from '@mui/material';

import { ListItemLink } from 'components/UI/List/List';
import { Typography } from 'components/UI/Typography/Typography';


import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './DesktopMenu.i18n.json';

import sx from './DesktopMenu.styles';


export function DesktopMenu() {
    const { t } = useLocalTranslation(translations);

    return (
        <List sx={sx.list} disablePadding>
            <ListItemLink sx={{ ...sx.listItem, ...sx.bigItem }} href={`/${Path.HOME}`}>
                <Typography sx={sx.title}>Каталог товаров</Typography>
            </ListItemLink>

            <Divider sx={sx.divider} />

            <ListItemLink sx={{ ...sx.listItem, ...sx.bigItem }} href={`/${Path.ABOUTUS}`}>
                <Typography sx={sx.title}>О компании</Typography>
            </ListItemLink>

            <Divider sx={sx.divider} />
            <ListItemLink sx={{ ...sx.listItem, ...sx.bigItem }} href={`/${Path.CONTACTS}`}>
                <Typography sx={sx.title}>Контакты</Typography>
            </ListItemLink>

            <Divider sx={sx.divider} />
            <ListItemLink sx={{ ...sx.listItem, ...sx.bigItem }} href={`/${Path.DELIVERY}`}>
                <Typography sx={sx.title}>Доставка</Typography>
            </ListItemLink>

            <Divider sx={sx.divider} />
            <ListItemLink sx={{ ...sx.listItem, ...sx.bigItem }} href={`/${Path.PROMOTIONS}`}>
                <Typography sx={sx.title}>Акции</Typography>
            </ListItemLink>
        </List>
    );
}
