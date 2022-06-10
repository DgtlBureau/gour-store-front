import buttonImage from '../../../assets/images/game/button.svg';
import buttonSmallImage from '../../../assets/images/game/button-small.svg';

export const sx = {
  player: {
    bottom: '85px',
    paddingRight: '15px',
  },
  controlBtn: {
    background: `url("${buttonImage}")`,
    width: '78px',
    height: '78px',
    boxShadow: 'none',
    position: 'absolute',
    zIndex: 100,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: '45px',
    },
    '&:active': {
      borderRadius: '45px',
      opacity: '0.8',
      transform: 'translateY(3px)',
      boxShadow: '0 3px #666',
    }
  },

  startBtn: {
    background: `url("${buttonSmallImage}")`,
    position: 'absolute',
    top: '165px',
    right: '50px',
    minWidth: '54px',
    height: '30px',
    boxShadow: 'none',
    zIndex: 100,
    borderRadius: '9px',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
    '&:active': {
      opacity: '0.8',
      transform: 'translateY(3px)',
      boxShadow: '0 3px #666',
    }
  },

  alarm: {
    top: '105px',
    left: '270px',
  },

  lives: {
    top: '150px',
  },

  counter: {
    top: '94px',
    right: '320px',
  },

  topLeftBtn: {
    top: '293px',
    left: '40px',
  },
  bottomLeftBtn: {
    top: '399px',
    left: '40px',
  },
  topRightBtn: {
    top: '293px',
    right: '40px',
  },
  bottomRightBtn: {
    top: '399px',
    right: '40px',
  },

  firstCheese: {
    top: '215px',
    left: '185px',
  },
  secondCheese: {
    top: '245px',
    left: '225px',
  },
  thirdCheese: {
    top: '270px',
    left: '275px',
  },

  firstSausage: {
    top: '350px',
    left: '180px',
  },
  secondSausage: {
    top: '380px',
    left: '225px',
  },
  thirdSausage: {
    top: '395px',
    left: '270px',
  },

  firstJamon: {
    top: '200px',
    right: '185px',
  },
  secondJamon: {
    top: '220px',
    right: '250px',
  },
  thirdJamon: {
    top: '250px',
    right: '295px',
  },

  firstChicken: {
    top: '340px',
    right: '185px',
  },
  secondChicken: {
    top: '380px',
    right: '230px',
  },
  thirdChicken: {
    top: '390px',
    right: '285px',
  },
}

export default sx;
