import React from 'react';

type LoaderProps = {
  width?: string;
  height?: string;
};

function Loader({ width = 'auto', height = 'auto' }: LoaderProps) {
  return (
    <svg viewBox='0 0 58 10' enableBackground='new 0 0 0 0' xmlSpace='preserve' width={width} height={height}>
      <circle fill='#FDCE85' stroke='none' cx='5' cy='5' r='5'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.1' />
      </circle>
      <circle fill='#FDCE85' stroke='none' cx='21' cy='5' r='5'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.2' />
      </circle>
      <circle fill='#FDCE85' stroke='none' cx='37' cy='5' r='5'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.3' />
      </circle>
      <circle fill='#FDCE85' stroke='none' cx='53' cy='5' r='5'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.4' />
      </circle>
    </svg>
  );
}

export default Loader;
