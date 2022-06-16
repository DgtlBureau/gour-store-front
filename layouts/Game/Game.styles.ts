import stripes  from '../../assets/images/stripes.svg'

const sx = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    height: '100%',
    backgroundImage: 'url(' + `${(stripes)}` + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  copyright: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default sx;
