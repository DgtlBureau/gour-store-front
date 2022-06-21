const sx = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '520px',
    padding: '60px',
    backgroundColor: 'background.default',
    border: '4px solid',
    borderColor: 'accent.main',
    borderRadius: '10px',
  },
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
    border: '1px solid #000',
  },
};

export default sx;
