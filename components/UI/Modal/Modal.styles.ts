export const sx = {
  modal: {
    position: 'absolute',
    top: {
      sm: '50%',
      xs: 'none',
    },
    left: {
      sm: '50%',
      xs: 'none',
    },
    transform: {
      sm: 'translate(-50%, -50%)',
      xs: 'none',
    },
    height: {
      sm: 'fit-content',
      xs: '100%',
    },
    width: '100%',
    maxWidth: {
      sm: '520px',
      xs: '100%',
    },
    padding: {
      sm: '60px',
      xs: '40px 20px',
    },
    bgcolor: 'background.default',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
  },
  acceptBtn: {
    width: '100%',
    marginTop: '14px',
  },
  cross: {
    position: {
      sm: 'absolute',
      xs: 'none',
    },
    top: {
      xs: 'none',
      sm: '30px',
    },
    right: {
      xs: 'none',
      sm: '52px',
    },
  },
};

export default sx;
