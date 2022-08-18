import stripes from 'assets/images/stripes.svg';

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
      xs: '0 10px 20px 10px',
      sm: '0 20px 40px 20px',
    },
  },
};

export default sx;
