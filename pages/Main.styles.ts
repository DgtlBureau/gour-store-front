export const sx = {
    productList: {
        margin: {
            md: '100px 0 0 0',
            sm: '80px 0 0 0',
            xs: '60px 0 0 0',
        },
    },
  },
  reviews: {
    margin: {
      sm: '40px 0 40px 0',
      xs: '30px 0 30px 0',
    },
  },
  banner: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    height: {
      md: '350px',
      sm: '300px',
      xs: '200px',
    },
    title: {
        fontSize: {
            sm: '40px',
            xs: '24px',
        },
        fontFamily: 'Roboto slab',
        fontWeight: 'bold',
        color: 'text.secondary',
    },
    promoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'justify-content',
    },
    pageInfoDescription: {
        marginTop: {
            xs: '20px',
            md: '40px',
        },
    },
};

export default sx;
