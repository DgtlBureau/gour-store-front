import { color } from 'themes';

const sx = {
  container: {
    background: color.secondary,
    borderRadius: '6px',
    padding: '20px',
  },
  title: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: color.black,
  },
  slider: {
    height: '100%',
    justifyContent: 'space-between',
  },
  stats: {
    margin: {
      xs: 0,
      md: '0 20px 0 0',
    },
  },
  rating: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  star: {
    color: color.accent,
  },
  emptyStar: {
    color: color.muted,
  },
};

export default sx;
