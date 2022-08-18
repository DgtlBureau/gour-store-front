export const sx = {
  header: {
    display: 'flex',
    alignItems: 'center',
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
    justifyContent: 'end',
    order: {
      xs: 2,
      sm: 4,
    },
  },
  totalText: {
    fontWeight: 'bold',
  },
  divider: {
    margin: '20px 0 0 0',
  },
  muted: {
    color: 'text.muted',
  },
  count: {
    textAlign: { sm: 'center', xs: 'left' },
  },
};

export default sx;
