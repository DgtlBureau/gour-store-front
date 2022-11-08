import { color } from 'themes';

const sx = {
  stock: {
    textAlign: 'center',
    color: color.muted,
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },
  singleLine: {
    maxHeight: '20px',

    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

export default sx;
