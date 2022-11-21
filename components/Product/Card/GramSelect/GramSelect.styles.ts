import { color } from 'themes';

export const sx = {
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: {
      xs: '4px 6px',
      md: '6px 12px',
    },
    backgroundColor: color.secondary,
    borderRadius: '6px',
    gap: { xs: '4px', md: '6px' },
    height: '100%',
  },
  title: {
    display: 'flex',
    color: color.muted,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  titleHidden: {
    display: {
      xs: 'none',
      md: 'block',
    },
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  list: {
    position: 'absolute',
    width: '90px',
    maxHeight: '120px',
    marginTop: '6px',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: color.secondary,
    borderRadius: '6px',
    zIndex: 100,
    overflowY: 'scroll',
  },
};

export default sx;
