import React from 'react';

export enum GameProductType {
  cheese = 'cheese',
  sausage = 'sausage',
  jamon = 'jamon',
  chicken = 'chicken',
}

export type GameProductProps = {
  type: GameProductType;
  tiltAngle: number;
};

export function GameProduct(props: GameProductProps) {
  return <div>GameProduct</div>
}
