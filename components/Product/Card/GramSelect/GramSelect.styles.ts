import { color } from 'themes';

export const sx = {
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '84px',
    padding: '6px 12px',
    backgroundColor: color.secondary,
    borderRadius: '6px',
    gap: '6px',
    height: '100%',
  },
  extenderHiddenTitle: {
    width: { xs: 'fit-content', md: '84px' },
    padding: { xs: '2px', md: '6px 12px' },

    '&.title': {
      display: 'none',
    },
  },
  title: {
    display: 'flex',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    color: color.muted,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  titleHidden: {},
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
