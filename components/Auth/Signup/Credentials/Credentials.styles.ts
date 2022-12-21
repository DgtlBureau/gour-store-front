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
  divider: {
    height: 28,
    marginRight: '14px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px',
  },
  checkboxLabel: {
    whiteSpace: 'normal' as const,
  },
  backBtn: {
    width: 'fit-content',
    marginBottom: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  stepper: {
    width: '100%',
    margin: '0 0 20px 0',
  },
  imageContainer: {
    display: {
      xs: 'none',
      md: 'flex',
    },
  },
  progress: {
    marginLeft: '12px',
  },
  timer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: 'text.muted',
  },
  codeField: {
    marginBottom: '14px',
    width: '50%',
  },
};

export default sx;
