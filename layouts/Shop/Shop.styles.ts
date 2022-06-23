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
    margin: {
      md: '50px 0px',
      sm: '40px 0px',
      xs: '30px 0px',
    },
    padding: {
      xs: '0 10px',
      sm: '0 20px',
      md: 0,
    },
  },
  footer: {
    marginTop: '180px',
    marginBottom: '50px',
  },
};

export default sx;
