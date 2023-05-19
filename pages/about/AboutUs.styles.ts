import backgroundImg from 'assets/images/delivery/GOURFOOD.png';
import backgroundCheese from 'assets/images/aboutUs/backCheese.svg';

export const sx = {
    banner: {
        fontFamily: 'Roboto Slab',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexDirection: {
            xs: 'column',
        },
        margin: '2%  0',
        border: '5px solid rgba(126, 95, 47, 0.2)',
        borderRadius: '60px',
        background: '#FFF9EE',
        backgroundImage: `url('${backgroundImg}')`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'contain',
        backgroundPosition: 'top',
        textAlign: 'center',
        padding: '35px 35px 0 35px',
        boxSizing: 'border-box',

        img: {
            margin: '5% auto 0 auto',
            width: '35%',
            height: '100%',
            alignSelf: {
                xs: 'center',
                md: 'flex-end',
            },
        },
        text: {
            fontFamily: 'Roboto Slab',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: {
                lg: '38px',
                md: '30px',
                xs: '20px',
            },
            width: '80%',
            lineHeight: '130%',
            color: '#7E5F2F',
            whiteSpace: 'pre-line',
            alignSelf: 'center',
        }
    },
    howWeWork: {
        margin: '10% 0 5% 0',
        fontFamily: 'Roboto Slab',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: {
            lg: '48px',
            md: '35px',
            xs: '25px',
        },
        lineHeight: '44px',
        color: '#7E5F2F',
    },
    containerHow: {
        gap: '20px',
        display: 'flex',
        overflowX: {
            xs: 'scroll',
            md: 'none',
        },

    },
    wrapperHow: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: {
            xs: '50%',
            md: '25%'
        },
    },
    cardHow: {
        display: 'flex',
        background: '#FBF4E6',
        borderRadius: '20px',
        border: '2px solid rgba(126, 95, 47, 0.2);',
        padding: '35px 30px 0px 30px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    last: {
        display: 'flex',
        background: '#FBF4E6',
        borderRadius: '20px',
        border: '2px solid rgba(126, 95, 47, 0.2);',
        padding: '66px 22px',
        justifyContent: 'center'
    },
    textHow: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '21px',
        lineHeight: '100%',
        textAlign: 'center',
        color: '#7E5F2F',
        whiteSpace: 'pre-line',
        marginTop: '15px',
    },
    containerDelivery: {
        margin: '2% 0 1% 0 ',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row',
        },
        gap: '30px',
        overflowY: 'hidden',
        backgroundImage: `url('${backgroundImg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    containerBox: {
        flexBasis: '50%'
    },
    deliverySP: {
        fontFamily: 'Roboto Slab',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '35px',
        lineHeight: '44px',
        color: '#7E5F2F',
        flexBasis: {
            xs: '100%',
            md: '50%',
        },
    },
    deliverySPText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#7E5F2F',
        flexBasis: {
            xs: '100%',
            md: '50%',
        },
        alignContent: 'bottom',
        marginLeft: 'auto',
        whiteSpace: 'pre-line',
    },
    cardTime: {
        display: 'flex',
        background: '#fff',
        padding: '30px',
        justifyContent: 'space-between',
        border: '2px solid rgba(126, 95, 47, 0.2);',
        borderRadius: '20px',
        flexBasis: {
            xs: '100%',
            md: '50%',
        },
        height: '120px',
    },
    deliveryTimeText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '18px',
        lineHeight: '20px',
        flexBasis: '80%',
        color: '#7E5F2F',
    },
    deliveryCond: {
        marginTop: '5%',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '140%',
        color: '#7E5F2F',
        whiteSpace: 'pre-line',
        flexBasis: {
            xs: '100%',
            md: '50%',
        }
    },
    containerPrice: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '50px',
        background: '#FBF4E6',
        border: '5px solid rgba(126, 95, 47, 0.2);',
        borderRadius: '60px',
        padding: '50px',
        margin: '10% 0',
        backgroundImage: `url('${backgroundCheese}')`,
    },
    deliveryCad: {
        padding: '60px 45px',
        border: '5px solid rgba(126, 95, 47, 0.2);',
        borderRadius: '120%',
        background: '#fff',
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '30px',
        lineHeight: '44px',
        color: '#7E5F2F',
    },
    deliveryCadWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    deliveryCadText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '120%',
        color: '#7E5F2F',
        marginTop: '10px',
        textAlign: 'center'
    },
    containerCad: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: {xs: 'column', md: 'row',},
        gap: '70px',
    },
    price: {
        fontFamily: 'Roboto Slab',
        fontStyle: 'normal',
        color: '#7E5F2F',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '120%',
    },
    paymentHead: {
        fontFamily: 'Roboto Slab',
        fontStyle: 'normal',
        color: '#7E5F2F',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '120%',
        textAlign: 'center',
        marginBottom: '5%'
    },
    containerPayment: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row'
        },
        gap: '50px',
    },
    paymentCard: {
        flexBasis: '33%',
        padding: '30px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FBF4E6',
        border: '3px solid rgba(126, 95, 47, 0.2)',
        borderRadius: '20px',
    },
    paymentCardHead: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '120%',
        color: '#7E5F2F',
        textAlign: 'center'
    },
    paymentCardText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '140%',
        color: '#7E5F2F',
        textAlign: 'center'
    },
    paymentCardImg: {
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        background: '#fff',
        borderRadius: '100%',
        border: '2px solid rgba(126, 95, 47, 0.2)',
        textAlign: 'center'
    },
    imageBox: {
        img: {
            margin: {
                xs: '0 auto',
                md: '0',
            },
            display: {
                xs: 'none',
                md: 'flex',
            }
        }
    },
    imageInProd: {
        display: 'flex',
        background: '#fff',
        padding: '30px',
        justifyContent: 'center',
        border: '2px solid rgba(126, 95, 47, 0.2);',
        borderRadius: '100%',
        '&: img': {
            width: '160px',
            height: '190px',
        }
    },
}

export default sx;