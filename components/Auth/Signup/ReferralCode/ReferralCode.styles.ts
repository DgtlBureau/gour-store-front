const sx = {
  title: {
    fontWeight: 700,
    fontSize: '18px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: 'space-between',
    margin: '24px 0',
  },
  radioBtn: {
    marginRight: 0,
    fontSize: '1px',
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
      xs: '12px 0',
      sm: '0 0 0 12px',
    },
  },
  field: {
    margin: '10px 0',
  },
  backBtn: {
    width: 'fit-content',
    marginBottom: '20px',
  },
  submitBtn: {
    width: '100%',
    marginTop: '10px',
  },
  stepper: {
    width: '100%',
    margin: '0 0 20px 0',
  },
};

export default sx;
