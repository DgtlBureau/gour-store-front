import { defaultTheme as t } from 'themes';

const sx = {
  container: {
    width: '100%',
  },
  notice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      sm: 'center',
      xs: 'flex-start',
    },

    maxWidth: '490px',
  },
  title: {
    textAlign: {
      sm: 'center',
      xs: 'none',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: t.palette.text.secondary,
    margin: '0 0 16px 0',
  },
  description: {
    textAlign: {
      sm: 'center',
      xs: 'none',
    },

    margin: '0 0 16px 0',

    fontSize: '16px',
  },
  btn: {
    width: {
      xs: '100%',
      sm: 'fit-content',
    },
  },
};

export default sx;
