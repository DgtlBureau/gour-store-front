import { color } from 'themes';

const sx = {
  select: {
    width: '100%',
    backgroundColor: color.secondary,
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
    minWidth: '180px',
    maxWidth: '280px',
    marginTop: '6px',
    padding: '14px',
    backgroundColor: color.white,
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
  applyBtn: {
    marginTop: '14px',
    width: '100%',
  },
};

export default sx;
