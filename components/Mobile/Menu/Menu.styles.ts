const sx = {
  list: {
    position: 'absolute',
    width: '100%',
    maxWidth: '375px',
    backgroundColor: '#7E5F2F',
    color: 'white',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 25px 10px 20px',
  },
  bigItem: {
    padding: '16px 25px 16px 20px',
  },
  title: {
    fontSize: '15px',
    fontWeight: 500,
  },
  city: {
    display: 'flex',
    alignItems: 'center',
  },
  cityTitle: {
    marginLeft: '22px',
  },
  languageItem: {
    paddingLeft: '8px',
  },
  languageTitle: {
    marginLeft: '34px',
  },
  language: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    borderColor: 'white',
    opacity: 0.1,
  },
  accent: {
    color: '#F7A400',
  },
  arrowIcon: {
    position: 'relative',
    height: '22px',
    width: '24px',
  },
  invertedArrow: {
    transform: 'rotate(180deg)',
  },
  grayArrow: {
    transform: 'rotate(-90deg)',
  },
  locationIcon: {
    position: 'relative',
    height: '20px',
    width: '14px',
    marginRight: '8px',
  },
  languageIcon: {
    position: 'relative',
    height: '20px',
    width: '28px',
    marginRight: '6px',
    img: {
      borderRadius: '6px',
    }
  },

  phones: {
    padding: '20px',
  },
  socials: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px 40px 20px',
  },
  link: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'white',
    '&:first-child': {
      marginRight: '20px',
    },
  },
  socialIcons: {
    display: 'flex',
  },
  socialIcon: {
    position: 'relative',
    height: '38px',
    width: '38px',
    marginLeft: '10px',
  },
};

export default sx;
