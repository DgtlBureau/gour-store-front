import { color } from 'themes';

const sx = {
  form: {
    marginBottom: '10px',
    padding: '20px',
    border: '1px solid',
    borderRadius: '6px',
    borderColor: 'accent.main',
    boxShadow: 'none',
    background: color.white,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  locationIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    width: '42px',
    borderRadius: '50%',
  },
  mainAddress: {
    backgroundColor: color.secondary,
  },
  title: {
    margin: '0 12px',
  },
  divider: {
    marginBottom: '16px',
    borderColor: color.secondary,
  },
};

export default sx;
