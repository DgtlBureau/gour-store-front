import { defaultTheme as t } from 'themes';

export const sx = {
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'text.muted',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    marginRight: '6px',
  },
  text: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },
  stock: {
    display: 'block',
    padding: '2px 16px',
    borderRadius: '4px',
    backgroundColor: t.palette.background.paper,
    color: t.palette.text.secondary,

    width: 'fit-content',
    height: '100%',

    maxHeight: '26px',

    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

export default sx;
