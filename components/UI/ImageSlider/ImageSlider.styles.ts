const sx = {
  container: {
    width: {
      md: '580px',
      xs: '100%',
    },
    maxWidth: {
      sm: '660px',
    },
    marginLeft: 0,
    marginRight: 0,
  },
  scroll: {
    display: {
      md: 'flex',
      xs: 'none',
    },
    overflow: 'hidden',
    padding: '10px 0',
  },
  slide: {
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
  },
  full: {
    height: {
      md: '500px',
      sm: '540px',
      xs: '300px',
    },
    // width: '100%',
    padding: '5px',
    objectFit: 'contain',
  },
  small: {
    cursor: 'pointer',
    height: '80px',
    width: '90px',
    marginRight: '14px',

    '&:last-child': {
      marginRight: 0,
    },
  },
  active: {
    border: '2px solid',
    borderColor: 'accent.main',
  },
};

export default sx;
