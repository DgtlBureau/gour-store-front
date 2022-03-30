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
    backgroundColor: '#25262D',
    color: 'white',
  },
  logo: {
    fontSize: '18px',
    fontWeight: 700,
  },
  iconBtn: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '34px',
    height: '34px',
    width: '34px',
    padding: 0,
    borderRadius: '6px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  menuIcon: {
    width: '18px',
    color: 'black',
  },
};

export default sx;
