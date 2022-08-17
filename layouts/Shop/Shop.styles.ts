import stripes from '../../assets/images/stripes.svg';

const sx = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${stripes})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px',
    margin: {
      md: '50px 0 0 0',
      sm: '40px 0 0 0',
      xs: '30px 0 0 0',
    },
    padding: {
      xs: '0 10px',
      sm: '0 20px',
    },
  },
  footer: {
    width: '100%',
    margin: {
      md: '100px 0 40px 0',
      sm: '80px 0 40px 0',
      xs: '60px 0 20px 0',
    },
    padding: {
      xs: '0 10px',
      sm: '0 20px',
    },
  },
};

export default sx;
