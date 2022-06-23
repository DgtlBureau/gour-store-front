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
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    paddingTop: '50px',
  },
  copyright: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default sx;
