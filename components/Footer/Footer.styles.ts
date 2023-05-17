import {color, defaultTheme as theme} from 'themes';

const sx = {
    card: {
        fontFamily: 'Roboto slab',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        padding: '16px',
        border: '2px solid',
        borderColor: 'rgba(126, 95, 47, 0.2);',
        width: '210px',
        height: '160px',
        color: '#7E5F2F',
        borderRadius: '20px',
        transition: '0.4s',
        '&:hover': {
            borderColor: 'rgba(126, 95, 47, 0.2);',
            backgroundColor: '#7E5F2F',
            color: '#ffffff',
            cursor: 'pointer',
            '& div': {
                '@media (min-width: 1024px)': {
                    display: 'none',
                }
            },
            '& p': {
                fontSize: '18px',
                margin: '50px auto',
                color: '#ffffff',
                fontWeight: '800',
            },
        },
        textLink: {
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '20px',
            textDecoration: 'none',
            justifyContent: 'space-around',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
        },
        textLabel: {
            fontSize: '16px',
            lineHeight: '20px',
            marginTop: '35%',
            fontWeight: '800',
        },
        icon: {
            borderRadius: '100px',
            border: '2.2px solid rgba(126, 95, 47, 0.2)',
            padding: '10px',
            display: 'flex',
        },
    },

    contactsWrapper: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row',
        },
        justifyContent: {
            xs: 'center',
            lg: 'space-between',
        },
        alignItems: 'center',
        margin: {
            sm: '0 0 30px 0',
            xs: '0 0 10px 0',
        },
    },
    contacts: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row',
        },
        alignItems: {
            xs: 'flex-start',
            sm: 'center',
        },
        justifyContent: {
            sm: 'center',
            md: 'flex-start',
        },
        flexWrap: 'no-wrap',
        gap: '25px'
    },
    social: {
        display: 'flex',
        flexDirection: {
            xs: 'row',
            md: 'column',
        },
        marginLeft: '10px',
        margin:{
            xs: '10px auto 30px auto'
        }
    },
    socialLink: {
        width: '44px',
        height: '44px',
        '&:first-of-type': {
            marginLeft: '0px',
        },
    },

    info: {
        display: 'flex',
        flexDirection: {
            sm: 'row',
            xs: 'column',
        },
        justifyContent: 'space-between',

        [theme.breakpoints.down('lg')]: {
            justifyContent: 'center',
            flexWrap: 'wrap',
        },

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'start',
            flexWrap: 'wrap',
        },
    },
    infoLink: {
        fontSize: {
            sm: '13px',
            xs: '10px',
        },
        margin: {
            sm: '0 0 10px 0',
            xs: '0 0 5px 0',
        },
        textDecoration: 'none',
        color: color.primary,
    },
    divider: {
        opacity: {
            lg: 1,
            xs: 0,
        },
        marginTop: 0,
        marginBottom: 0,
        margin: '0 15px',
        borderColor: color.secondary,
    },
    logo: {
        height: {
            xs: '110px',
            sm: '130px',
            md: '150px',
        },
        width: {
            xs: '90px',
            sm: '110px',
            md: '130px',
        },
        display: {
            xs: 'none',
            lg: 'flex',
        }
    },
};

export default sx;
