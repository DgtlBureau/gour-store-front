import { ClickAwayListenerProps, ClickAwayListener as MUIClickEventListener } from '@mui/material';

export function ClickAwayListener({ children, ...props }: ClickAwayListenerProps) {
  return (
    <MUIClickEventListener {...props}>
      <div>{children}</div>
    </MUIClickEventListener>
  );
}
