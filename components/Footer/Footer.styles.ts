import {color, defaultTheme as theme} from 'themes';

const sx = {
    footMain: {
        width: '100%',
        backgroundColor: '#FBF4E6',
        marginTop: '5%',
    },
    containerFoot: {
        margin: '2% auto',
        maxWidth: '1200px',
    },
    card: {
        fontFamily: 'Roboto slab',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        padding: '16px',
        border: '2px solid',
        borderColor: 'rgba(126, 95, 47, 0.2);',
        width: {
            xs: '300px',
            md: '210px'
        },
        height: '160px',
        color: '#7E5F2F',
        borderRadius: '20px',
        transition: '0.4s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            borderColor: 'rgba(126, 95, 47, 0.2);',
            backgroundColor: '#7E5F2F',
            color: '#ffffff',
            cursor: 'pointer',
            justifyContent: 'center',
            '& div': {
                '@media (min-width: 1024px)': {
                    display: 'none',
                }
            },
            '& p': {
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: '800',
            },
            '& a': {
                justifyContent: 'space-evenly',
                margin: '0 auto'
            },
        },
        textLink: {
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '20px',
            flexBasis: '100%',
            textDecoration: 'none',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
        },
        textLabel: {
            fontSize: '16px',
            lineHeight: '20px',
            alignItems: 'baseline',
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
        marginLeft: '20px',
        margin: {
            xs: 'auto auto'
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
            marginLeft: '10px',
            marginTop: '10px',
        },
    },
    infoLink: {
        fontSize: {
            sm: '12px',
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
        margin: '0 10px',
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
