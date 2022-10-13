import { Typography } from 'components/UI/Typography/Typography';

import { defaultTheme as t } from 'themes';

const sx = {
  optionBox: {
    padding: '6px 12px',
    color: t.palette.text.secondary,
    backgroundColor: t.palette.common.white,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'pointer',
  },
  selected: {
    background: t.palette.primary.main,
    color: t.palette.common.white,
  },
};

type SelectItemProps = {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
};

export function ProductFilterSelectItem({ title, isSelected, onSelect }: SelectItemProps) {
  return (
    <Typography
      variant='body1'
      onClick={onSelect}
      sx={{
        ...sx.optionBox,
        ...(isSelected && sx.selected),
      }}
    >
      {title}
    </Typography>
  );
}
