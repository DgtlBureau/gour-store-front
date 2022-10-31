import { color } from 'themes';

const sx = {
  stock: {
    display: 'block',
    padding: '2px 16px',
    borderRadius: '4px',
    backgroundColor: color.secondary,
    color: color.primary,

    height: '100%',
    textAlign: 'center',
  },
  singleLine: {
    maxHeight: '26px',

    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

export default sx;
