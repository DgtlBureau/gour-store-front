import { defaultTheme as theme } from '../../themes';

const sx = {
  contactsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row-reverse',
    }
    },
  contacts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    fontFamily: 'Roboto slab',
    marginTop: 'auto',
    paddingBottom: '40px',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '40px',
      '&:lastChild': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '18px',
      flexDirection: 'column-reverse',
      alignItems: 'flex-end',
      marginLeft: '0',
      '&:lastChild': {
        marginRight: '0',
      },
    },
  },
  contactsLink: {
    whiteSpace: 'nowrap',
    marginRight: '40px',
    fontSize: '24px',
    fontWeight: 700,
    color: '#7E5F2F',
    flexWrap: 'wrap',
    [theme.breakpoints.down('lg')]: {
      marginRight: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      order: '1',
      fontSize: '16px',
      lineHeight: '18px',
    }
  },
  social: {
    display: 'flex',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      marginLeft: '0',
      marginTop: '20px',
      order: '0',
      '&:firstChild': {
        marginLeft: '0',
      },
    }
  },
  socialLink: {
    marginLeft: '20px',
    '&:firstChild': {
      marginLeft: 0,
    },
    [theme.breakpoints.down('lg')]: {
      marginRight: '0px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginRight: '20px',
    }
   },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'start',
      flexWrap: 'wrap'
    },
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
    backgroundColor: 'red',
  },
  logo: {
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      order: 3,
      alignSelf: 'flex-end'
    },
  },
};

export default sx;
