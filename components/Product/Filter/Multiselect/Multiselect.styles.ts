import { defaultTheme as t } from '../../../../themes';

const sx = {
  select: {
    backgroundColor: 'background.paper',
    boxShadow: 'none',
    borderRadius: '6px',
    borderColor: 'none',
    '&:before': {
      content: 'none',
    },
    '&.Mui-expanded': {
      margin: '0 0 10px 0',
    },
  },
  optionBox: {
    padding: '6px 12px',
    color: t.palette.text.secondary,
    backgroundColor: t.palette.common.white,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'pointer',
  },
  selected: {
    background: t.palette.primary.main,
    color: t.palette.common.white,
  },
  title: {
    color: t.palette.text.muted,
  },
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'background.paper',
    borderRadius: '6px',
  },
  list: {
    position: 'absolute',
    maxWidth: '260px',
    marginTop: '6px',
    padding: '14px 0',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: t.palette.secondary.main,
    borderRadius: '6px',
    zIndex: 100,
  },
  listItemIcon: {
    minWidth: '24px',
  },
  listItemText: {
    marginLeft: '6px',
  },
  checkbox: {
    marginLeft: '12px',
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
  actions: {
    marginTop: '14px',
    padding: '0 14px',
  },
  applyBtn: {
    marginLeft: '6px',
  },
};

export default sx;
