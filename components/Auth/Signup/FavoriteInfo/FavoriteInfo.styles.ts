import { color } from 'themes';

const sx = {
  product: {
    display: 'flex',
    alignItems: {
      xs: 'center',
      md: 'flex-end',
    },
  },
  selected: {
    border: '2px solid',
    borderColor: color.accent,
  },
};

export default sx;
