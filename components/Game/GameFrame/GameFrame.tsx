import React, {ReactNode} from 'react';

import {Button} from '../../UI/Button/Button';
import {Box} from '../../UI/Box/Box';
import backgroundImage from '../../../assets/images/game/background.svg';
import buttonImage from '../../../assets/images/game/button.svg';

export type GameFrameProps = {
  children: ReactNode
};

const sx = {
    panel: {
        background: `url("${backgroundImage}")`,
        width: '1092px',
        height: '588px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '54px 141px',
        position: 'relative',
    },

    button: {
        background: `url("${buttonImage}")`,
        width: '78px',
        height: '78px',
        boxShadow: 'none',
        position: 'absolute',
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

    topLeft: {
        top: '293px',
        left: '40px',
    },

    bottomLeft: {
        top: '399px',
        left: '40px',
    },

    topRight: {
        top: '293px',
        right: '40px',
    },

    bottomRight: {
        top: '399px',
        right: '40px',
    },
};

export function GameFrame(props: GameFrameProps) {
    return <Box sx={sx.panel}>
        <Button sx={{...sx.button, ...sx.topLeft}}/>
        <Button sx={{...sx.button, ...sx.bottomLeft}}/>
        <Button sx={{...sx.button, ...sx.topRight}}/>
        <Button sx={{...sx.button, ...sx.bottomRight}}/>
    </Box>;
  return <div>GameFrame</div>
}
