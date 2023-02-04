import { color } from 'themes';

export const sx = {
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
    marginBottom: '16px',
  },
  order: {
    flexDirection: {
      xs: 'column-reverse',
      md: 'row',
    },
  },

  infoModalContent: {
    textAlign: 'center',
  },
  infoModalLink: {
    fontSize: 'inherit',
  },
  modal: {
    width: {
      xs: '100%',
      md: '450px',
    },
    height: {
      xs: '100%',
      md: '450px',
    },
    backgroundColor: color.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    textAlign: 'center',
  },
  SBPSpinner: {
    marginTop: '80px',
  },
};

export default sx;
