import { color } from 'themes';

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
    color: color.primary,
  },
  promo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  promoText: {
    color: color.muted,
  },

  textarea: {
    margin: 0,
  },
  btn: {
    width: '100%',
  },
  btnPromo: {
    height: 56,
    width: {
      xs: '100%',
      md: '155px',
    },
  },
  descriptionPromo: {
    padding: '6px 0 8px 16px',
  },
  agreement: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    color: color.muted,
  },
  agreementLabel: {
    whiteSpace: 'normal' as const,
  },
};

export default sx;
