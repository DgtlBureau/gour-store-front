import stripes from '../../assets/images/stripes.svg';

const sx = {
  layout: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: `url(${stripes})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  content: {
    padding: {
      xs: '10px 0',
      sm: '10px 0',
      md: '50px 0',
    },
  },
};

export default sx;
