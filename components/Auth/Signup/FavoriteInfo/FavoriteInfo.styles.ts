import { defaultTheme as theme } from '../../../../themes';

const sx = {
  circle: {
    width: '52px',
    height: '52px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '50%',

    backgroundColor: '#ebebeb',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid #ebebeb',

    cursor: 'pointer',
  },
  selected: {
    border: '2px solid',
    borderColor: theme.palette.accent.main,
  },
};

export default sx;
