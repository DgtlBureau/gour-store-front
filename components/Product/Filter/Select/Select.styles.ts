import { color } from 'themes';

const sx = {
  select: {
    backgroundColor: color.secondary,
    boxShadow: 'none',
    borderRadius: '6px',
    borderColor: 'none',
    width: '100%',
    '&:before': {
      content: 'none',
    },
    '&.Mui-expanded': {
      margin: '0 0 10px 0',
    },
  },
  optionBox: {
    padding: '6px 12px',
    color: color.primary,
    backgroundColor: color.white,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'pointer',
  },
  selected: {
    background: color.primary,
    color: color.white,
  },
  title: {
    color: color.muted,
  },
  extender: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    backgroundColor: color.secondary,
    borderRadius: '6px',
  },
  list: {
    position: 'absolute',
    maxWidth: '260px',
    marginTop: '6px',
    padding: '14px',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: color.secondary,
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
