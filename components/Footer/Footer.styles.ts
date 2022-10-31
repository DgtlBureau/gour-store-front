import { color, defaultTheme as theme } from 'themes';

const sx = {
  contactsWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'row-reverse',
      sm: 'row',
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: {
      sm: '0 0 20px 0',
      xs: '0 0 10px 0',
    },
  },
  contacts: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    alignItems: {
      xs: 'flex-end',
      sm: 'center',
    },
    justifyContent: {
      sm: 'flex-end',
    },
    flexWrap: 'wrap-reverse',
    fontFamily: 'Roboto slab',
  },
  contactsLink: {
    whiteSpace: 'nowrap',
    margin: {
      lg: '0 20px 0 0',
      sm: '10px 0 10px 20px',
      xs: '0 0 10px 0',
    },
    flexWrap: 'wrap',
    fontSize: {
      md: '24px',
      sm: '20px',
      xs: '16px',
    },
    fontWeight: 'bold',
    color: color.primary,
  },
  social: {
    display: 'flex',
    flexWrap: 'nowrap',
    margin: {
      sm: '0 0 0 20px',
    },
  },
  socialLink: {
    height: '38px',
    margin: {
      xs: '0 10px 0 0',
      sm: '0 0 0 20px',
    },

    '&:first-of-type': {
      marginLeft: '0px',
    },
  },

  info: {
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column',
    },
    justifyContent: 'space-between',

    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'start',
      flexWrap: 'wrap',
    },
  },
  infoLink: {
    fontSize: {
      sm: '13px',
      xs: '10px',
    },
    margin: {
      sm: '0 0 10px 0',
      xs: '0 0 5px 0',
    },
    textDecoration: 'none',
    color: color.primary,
  },
  divider: {
    opacity: {
      lg: 1,
      xs: 0,
    },
    marginTop: 0,
    marginBottom: 0,
    margin: '0 15px',
    borderColor: color.secondary,
  },
  logo: {
    height: {
      xs: '110px',
      sm: '130px',
      md: '150px',
    },
    width: {
      xs: '90px',
      sm: '110px',
      md: '130px',
    },
  },
};

export default sx;
