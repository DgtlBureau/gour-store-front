import {url} from 'inspector';
import stripes  from '../../assets/images/stripes.svg'

const sx = {
  shopLayout: {
    display: 'flex',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    width: '1200px',
  },
  footer: {
    marginTop: '180px',
    marginBottom: '50px',
  },
};

export default sx;
