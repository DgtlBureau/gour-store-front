import { color } from 'themes';

export const sx = {
  docket: {
    margin: '40px 0',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: color.muted,
    '&:last-child': {
      marginBottom: '10px',
    },
  },
  label: {
    whiteSpace: 'nowrap',
  },
  value: {
    fontWeight: 700,
    fontFamily: 'Roboto slab',
  },
  discountValue: {
    color: color.error,
  },
  total: {
    color: color.primary,
  },
  divider: {
    width: '100%',
    margin: '0 10px',
    border: '1px dashed rgba(0, 0, 0, 0.2)',
  },
};

export default sx;
