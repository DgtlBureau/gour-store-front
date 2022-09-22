import stripes from 'assets/images/stripes.svg';

const sx = {
  layout: {
    padding: {
      xs: '20px 0',
    },
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${stripes})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: 'calc(100% - 20px)',
  },
};

export default sx;
