const sx = {
  title: {
    fontWeight: 700,
    fontSize: '18px',
    marginBottom: '14px',
  },
  field: {
    marginBottom: '14px',
  },
  phone: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  getCodeBtn: {
    whiteSpace: 'nowrap',
    height: '100%',
    minWidth: {
      xs: '100%',
      sm: 'auto',
    },
    margin: {
      xs: '12px 0',
      sm: '0 0 0 12px',
    },
  },
  links: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '14px',
    button: {
      color: 'accent.main',
    },
  },
  link: {
    textAlign: 'left',
  },
  backBtn: {
    width: 'fit-content',
    marginBottom: '20px',
  },
  submitBtn: {
    width: '100%',
  },
};

export default sx;
