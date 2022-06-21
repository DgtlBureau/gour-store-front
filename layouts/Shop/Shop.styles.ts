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
    width: '100%',
    maxWidth: '1200px',
    paddingTop: '50px',
    padding: '50px 20px 20px 20px',
  },
  footer: {
    marginTop: '180px',
    marginBottom: '50px',
  },
};

export default sx;
