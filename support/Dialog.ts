import store from '@/store';
import { MiDialogOptions } from '@/components/MiDialog/MiDialog';

export const openDialog = (options: MiDialogOptions) => {
  store.dispatch('openDialog', options);
};

export const closeDialog = () => {
  store.dispatch('closeDialog');
};
