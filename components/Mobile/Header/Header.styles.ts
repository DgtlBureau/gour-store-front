import { defaultTheme as t } from "../../../themes";

const sx = {
  headerWrapper: {
    position: 'relative',
    maxWidth: '375px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: t.palette.primary.main,
    color: t.palette.common.white,
  },
  iconBtn: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '34px',
    height: '34px',
    width: '34px',
    padding: 0,
    borderRadius: '6px',
    backgroundColor: t.palette.common.white,
    '&:hover': {
      backgroundColor: t.palette.common.white,
    },
  },
  menuIcon: {
    width: '18px',
    color: t.palette.common.black,
  },
};

export default sx;
