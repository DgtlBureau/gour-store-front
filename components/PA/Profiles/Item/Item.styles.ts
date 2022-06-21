const sx = {
  profile: {
    marginBottom: '10px',
    padding: '20px',
    border: '1px solid',
    borderRadius: '6px',
    borderColor: 'secondary.main',
    boxShadow: 'none',
    background: 'none',
    '&:before': {
      content: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
      marginBottom: '10px',
    },
  },
  expanded: {
    borderColor: 'accent.main',
  },
  summary: {
    margin: 0,
    padding: 0,
    '&.Mui-expanded': {
      minHeight: '48px',
    },
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  locationIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    width: '42px',
    borderRadius: '50%',
  },
  mainAddress: {
    backgroundColor: 'secondary.main',
  },
  title: {
    margin: '0 12px',
  },
  divider: {
    marginBottom: '16px',
    borderColor: 'secondary.main',
  },
  details: {
    marginTop: '20px',
    padding: 0,
  },
};

export default sx;
