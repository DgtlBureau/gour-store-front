import { defaultTheme as t } from 'themes';

export const sx = {
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: { xs: 'fit-content', md: '84px' },
    padding: { xs: '2px', md: '6px 12px' },
    backgroundColor: 'background.paper',
    borderRadius: '6px',
    gap: '6px',
    height: '100%',
  },
  title: {
    display: 'flex',
    color: t.palette.text.muted,
  },
  titleHidden: {},
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  list: {
    position: 'absolute',
    width: '84px',
    maxHeight: '120px',
    marginTop: '6px',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: t.palette.secondary.main,
    borderRadius: '6px',
    zIndex: 100,
    overflow: 'scroll',
  },
};

export default sx;
