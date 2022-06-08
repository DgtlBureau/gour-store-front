import stripes  from '../../assets/images/stripes.svg'

const sx = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    paddingTop: '100px',
    backgroundImage: 'url(' + `${(stripes)}` + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
},
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1200px',
  },
  footer: {
    width: '1200px',
    marginBottom: '50px',
  },
};

export default sx;
