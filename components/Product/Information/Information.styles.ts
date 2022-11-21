import { color } from 'themes';

const sx = {
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: {
      xs: '100%',
      sm: '450px',
    },
    color: color.muted,
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    color: color.muted,
  },
  emptyStar: {
    color: color.secondary,
  },
  count: {
    marginLeft: '6px',
  },
  comments: {
    cursor: 'pointer',
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    marginTop: '10px',
  },
  divider: {
    height: '0px',
    width: '100%',
    margin: '0 10px',
    opacity: '0.5',
    borderBottom: '1px solid',
    borderColor: color.primary,
  },
  value: {
    color: color.accent,
  },
};

export default sx;
