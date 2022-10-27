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
    overflowY: 'auto',

    borderRadius: { xs: 'none', sm: '10px' },
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    marginBottom: '14px',
  },
  closeBtn: {
    alignSelf: 'flex-start',
  },
  controlBtnGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '14px',
  },
  controlBtn: {
    width: '100%',
  },
};

export default sx;
