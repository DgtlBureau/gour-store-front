import React, { useMemo } from 'react';

import { ParsedUrlQuery } from 'querystring';

import { useAppNavigation } from 'components/Navigation';
import { InfoModal } from 'components/UI/InfoModal/InfoModal';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { Path } from 'constants/routes';

import { sx } from './GeneralModals.styles';

export function GeneralInfoModals() {
  const { pathname, query, changeChapter } = useAppNavigation();

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const modalData = useMemo(() => generateModalData(query), [query]);

  const handleClose = () => changeChapter(pathname, false);

  return modalData ? (
    <InfoModal
      isOpen
      title={modalData.title}
      status={modalData.status}
      content={modalData.content}
      onClose={handleClose}
    />
  ) : null;
}

function generateModalData(query: ParsedUrlQuery) {
  const { paymentStatus, amount } = query;
  if (paymentStatus === 'success' && amount) {
    return {
      status: 'success',
      title: 'Платёж успешно зачислен',
      content: (
        <Typography color='text.secondary' sx={sx.contentAmount}>
          {amount} ₽
        </Typography>
      ),
    } as const;
  }
  if (paymentStatus === 'failure') {
    return {
      status: 'failure',
      title: 'Во время оплаты возникла ошибка',
      content: (
        <Typography color='text.secondary' sx={sx.contentText} variant='body1'>
          Вы можете отслеживать статус заказа в&nbsp;разделе{' '}
          <Link href={`/${Path.PERSONAL_AREA}/${Path.PAYMENTS}`}>
            <Typography color='accent.main' variant='caption' sx={sx.contentLink}>
              Платежи
            </Typography>
          </Link>{' '}
          в&nbsp;личном кабинете.
        </Typography>
      ),
    } as const;
  }
  return null;
}
