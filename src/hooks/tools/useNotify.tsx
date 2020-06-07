import React from 'react';
// snack
import { useSnackbar, VariantType } from 'notistack';

// components

function useNotify() {
  const { enqueueSnackbar } = useSnackbar();

  function notify(content: string, variant: VariantType) {
    enqueueSnackbar(content, { 
      variant: variant,
      preventDuplicate: true,
      autoHideDuration: variant === 'error'? 4000: 2000,
    });
  }

  return notify;
}

export default useNotify;
