export const sx = {
  header: {
    width: '100%',
    marginRight: '10px',
  },
  status: {
    width: 'fit-content',
    marginRight: '10px',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  details: {
    marginTop: '20px',
    padding: 0,
  },
  contacts: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
  },
  total: {
    textAlign: 'right',
    fontWeight: 'bold',
    order: {
      xs: 2,
      sm: 4,
    },
  },
  divider: {
    margin: '20px 0 0 0',
  },
  muted: {
    color: 'text.muted',
  },
};

export default sx;
