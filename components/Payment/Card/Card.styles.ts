export const sx = {
  container: {
    display: 'grid',
    gridTemplate: {
      xs: `
        "title price" auto
        "status status" auto 
        "timer timer" auto
        "pay-btn pay-btn" auto / auto auto
      `,
      m: `
        "title price price" auto
        "status timer pay-btn" auto / 1fr auto auto
      `,
      lg: '"title status timer pay-btn price" 1fr / auto 1fr auto auto auto',
    },

    gridRowGap: '12px', // TODO: add adaptive gap
    gridColumnGap: '12px', // TODO: add adaptive gap

    alignItems: 'center',
    marginRight: '10px',
    border: '1px solid #FDCE85',
    backgroundColor: '#FFFEF7',
    borderRadius: '6px',
    padding: '20px',

    ':not(:last-of-type)': {
      marginBottom: '20px',
    },
  },
  title: {
    gridArea: 'title',
    color: 'text.primary',
    fontSize: '18px',
    fontWeight: 700,
  },
  statusBlock: {
    display: 'flex',
    alignItems: 'center',
    gridArea: 'status',
  },
  status: {
    fontSize: '12px',
    lineHeight: '18px',
    marginRight: '12px',
    padding: '2px 8px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },

  statusWaiting: {
    backgroundColor: '#FFF1BE',
  },
  statusCancelled: {
    backgroundColor: '#FFE5D6',
  },
  statusPaid: {
    backgroundColor: '#DEF4E6',
  },
  statusFailed: {
    color: '#F7A400',
    border: '1px solid #F7A400',
  },

  statusDate: {
    fontWeight: 500,
    fontSize: '12px',
    color: '#A18677',
  },

  timer: {
    gridArea: 'timer',
  },
  timerLabel: {
    color: '#A18677',
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'right',
  },
  timerValue: {
    color: '#F7A400',
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },

  payBtnBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    gridArea: 'pay-btn',
  },
  payBtn: {
    fontSize: '15px',
    fontWeight: 500,
    padding: {
      xs: '11px 20px',
      m: '7px 16px',
      lg: '3px 10px',
    },
    textTransform: 'lowercase',
    textAlign: 'right',
    width: '100%',
  },

  price: {
    fontWeight: 700,
    gridArea: 'price',
    textAlign: 'right',
    fontSize: '18px',
    minWidth: {
      md: '115px',
    },
  },
};

export default sx;
