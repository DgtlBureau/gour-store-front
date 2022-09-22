import { defaultTheme as theme } from 'themes';

export const sx = {
  form: {
    maxWidth: {
      xs: '100%',
      md: '650px',
    },
  },
  block: {
    marginBottom: '40px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: theme.palette.text.secondary,
  },
  promo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  promoText: {
    color: theme.palette.text.muted,
  },

  textarea: {
    margin: 0,
  },
  btn: {
    width: '100%',
  },
  agreement: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    color: theme.palette.text.muted,
  },
  agreementLabel: {
    whiteSpace: 'normal' as const,
  },
};

export default sx;
