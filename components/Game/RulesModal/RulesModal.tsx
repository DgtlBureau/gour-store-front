import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { defaultTheme as t } from 'themes';

type Props = {
  isOpen: boolean;
  onAccept: () => void;
};

export function GameRulesModal({ isOpen, onAccept }: Props) {
  return (
    <Modal title='Правила игры' acceptText='Вернуться к игре' isOpen={isOpen} onAccept={onAccept}>
      <Typography variant='body1'>
        <b>Ваша цель</b> — собрать как можно больше падающих продуктов. За каждый пойманный продукт вы получаете{' '}
        <div style={{ display: 'inline', color: t.palette.accent.main }}>1 балл.</div>
      </Typography>

      <Typography variant='body1' sx={{ margin: '8px 0' }}>
        <b>Игра заканчивается</b>, когда на землю падает больше 3-х продуктов.
      </Typography>

      <Typography variant='body1'>
        Первая игра — <b>за наш счёт</b>. Если захотите сыграть ещё раз, можете купить жизни за чизкоины (кнопка «+» в
        верхней части сайта).
      </Typography>
    </Modal>
  );
}
