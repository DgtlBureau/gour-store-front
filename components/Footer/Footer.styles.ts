const sx = {
  contactsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contacts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
  },
  contactsLink: {
    whiteSpace: 'nowrap',
    marginRight: '40px',
    fontSize: '24px',
    fontWeight: 700,
    color: '#7E5F2F',
  },
  social: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  socialLink: {
    marginLeft: '20px',
    '&:first-child': {
      marginLeft: 0,
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoLink: {
    fontSize: '13px',
    textDecoration: 'none',
    color: '#7E5F2F',
  },
  divider: {
    borderColor: '#F4E7CE',
    marginTop: 0,
    marginBottom: 0,
    margin: '0 15px',
  },
  logo: {
    marginBottom: '20px',
  },
};

export default sx;
