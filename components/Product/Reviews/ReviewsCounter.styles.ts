import { color } from 'themes';

const sx = {
  counter: {
    display: 'flex',
    flexDirection: 'column',
    color: 'text.muted',
  },
  progress: {
    width: '100%',
    height: '4px',
    borderRadius: '99px',
    backgroundColor: color.white,
  },
  progressFill: {
    backgroundColor: color.accent,
    height: '100%',
    borderRadius: '99px',
  },
  star: {
    color: color.accent,
  },
  reviews: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
};

export default sx;
