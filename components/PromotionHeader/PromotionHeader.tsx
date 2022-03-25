import React, { CSSProperties, useEffect, useState } from 'react';

import { Typography } from '../UI/Typography/Typography';
import { differenceInSeconds, minutesToHours } from 'date-fns';
import { Chip, Stack } from '@mui/material';

import s from './PromotionHeader.module.scss';
import { secondsToMinutes } from 'date-fns/esm';

export type PromotionHeaderProps = {
  title: string;
  image: string;
  end: Date;
};

const headerSx: CSSProperties = {
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '6px',
  backgroundColor: '#ebebeb',
};

export function PromotionHeader({ title, image, end }: PromotionHeaderProps) {
  const [seconds, setSeconds] = useState<number>(0);
  const [timer, setTimer] = useState<string>('');

  useEffect(() => {
    const nowDate = new Date();

    setSeconds(differenceInSeconds(end, nowDate));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
      setTimer(formatSeconds(seconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatSeconds = (seconds: number) => {
    const remainderSeconds = seconds % 60;
    const roundedSeconds = seconds - remainderSeconds;
    const minutes = secondsToMinutes(roundedSeconds);
    const hours = minutesToHours(minutes);
    return `${hours}:${minutes % 60}:${remainderSeconds}`;
  };

  return (
    <Stack sx={{ maxWidth: '1200px' }}>
      <Stack sx={{ ...headerSx }}>
        <img className={s.image} src={image} />
        <Typography
          sx={{ position: 'absolute', top: '30px', left: '30px' }}
          variant="h2"
        >
          {title}
        </Typography>
        <div className={s.timer}>
          <Typography variant="body1">Осталось {timer}</Typography>
        </div>
      </Stack>
      <Typography sx={{ margin: '20px 0 0 0' }} variant="body1">
        В своём стремлении повысить качество жизни, они забывают, что
        сложившаяся структура организации выявляет срочную потребность
        экспериментов, поражающих по своей масштабности и грандиозности.
        Безусловно, сплочённость команды профессионалов является качественно
        новой ступенью анализа существующих паттернов поведения. С другой
        стороны, постоянный количественный рост и сфера нашей активности, в
        своём классическом представлении, допускает внедрение как
        самодостаточных, так и внешне зависимых концептуальных решений.
        <br />
        Таким образом, постоянное информационно-пропагандистское обеспечение
        нашей деятельности однозначно определяет каждого участника как
        способного принимать собственные решения касаемо соответствующих условий
        активизации. Есть над чем задуматься: ключевые особенности структуры
        проекта разоблачены. Разнообразный и богатый опыт говорит нам, что
        сложившаяся структура организации требует анализа направлений
        прогрессивного развития. Также как базовый вектор развития, а также
        свежий взгляд на привычные вещи - безусловно открывает новые горизонты
        для экспериментов, поражающих по своей масштабности и грандиозности.
      </Typography>
    </Stack>
  );
}
