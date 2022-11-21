const sx = {
  title: {
    fontWeight: 700,
    fontSize: '18px',
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
    minWidth: {
      xs: '100%',
      sm: 'auto',
    },
    margin: {
      xs: '12px 0 0 0',
      sm: '0 0 0 12px',
    },
  },
  field: {
    marginBottom: '14px',
  },
  codeField: {
    width: '50%',
  },
  backBtn: {
    width: 'fit-content',
    marginBottom: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  divider: {
    height: 28,
    marginRight: '14px',
  },
  timer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: 'text.muted',
  },
};

export default sx;
