import { Typography } from 'components/UI/Typography/Typography';

import { color } from 'themes';

const sx = {
  optionBox: {
    padding: '6px 12px',
    color: color.primary,
    backgroundColor: color.white,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'pointer',
  },
  selected: {
    background: color.primary,
    color: color.white,
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
