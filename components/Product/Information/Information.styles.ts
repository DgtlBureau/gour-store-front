import { defaultTheme as t } from "../../../themes";

const sx = {
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    color: t.palette.text.muted || '',
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
    color: t.palette.text.muted,
  },
  emptyStar: {
    color: t.palette.secondary.main,
  },
  count: {
    marginLeft: '6px',
  },
  comments: {
    cursor: 'pointer',
  },
  characteristic: {
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
    borderColor: t.palette.primary.main,
  },
  value: {
    color: t.palette.accent.main,
  },
};

export default sx;
