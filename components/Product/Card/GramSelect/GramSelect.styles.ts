import { defaultTheme as t } from 'themes';

export const sx = {
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '84px',
    padding: {
      xs: '4px 6px',
      md: '6px 12px',
    },
    backgroundColor: 'background.paper',
    borderRadius: '6px',
    gap: '6px',
    height: '100%',
  },
  title: {
    display: 'flex',
    color: t.palette.text.muted,
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
    borderColor: t.palette.secondary.main,
    borderRadius: '6px',
    zIndex: 100,
    overflowY: 'scroll',
  },
};

export default sx;
