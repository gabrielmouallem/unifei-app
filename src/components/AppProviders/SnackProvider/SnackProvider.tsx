import React from 'react';

import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

// add action to all snackbars
const notistackRef = React.createRef<any>();
const onClickDismiss = (key: any) => () => {
  notistackRef.current.closeSnackbar(key);
}

const SnackProvider = (props: Props) => (
  <SnackbarProvider
    ref={notistackRef}
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    hideIconVariant
    action={(key: any) => (
      <CloseIcon onClick={onClickDismiss(key)} />
    )}
  >
    {props.children}
  </SnackbarProvider>
);

export default SnackProvider;
