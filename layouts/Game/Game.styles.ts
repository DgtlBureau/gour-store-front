import stripes from '../../assets/images/stripes.svg';

const sx = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(' + `${stripes}` + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    transform: {
      xs: 'rotate(90deg)',
      md: 'none',
    },
  },
  header: {
    width: {
      xs: '100vh',
      md: '100%',
    },
  },
  content: {
    paddingTop: '50px',
  },
  copyright: {
    display: {
      xs: 'none',
      md: 'flex',
    },
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default sx;
