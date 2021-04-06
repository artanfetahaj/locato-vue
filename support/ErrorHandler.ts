/* eslint-disable default-case */
import { AxiosError } from 'axios';
import store from '@/store';
import { MiDialogOptions, DialogType } from '@/components/MiDialog/MiDialog.ts';

export default class ErrorHandler {
  public static updated(message: string) {
    ErrorHandler.alert(message, 'Er is een nieuwe versie beschikbaar', 'warning');
  }

  public static network(error: AxiosError) {
    const response = error.response;
    let message = '';

    if (response) {
      switch (response.status) {
        case 400:
          message = response.data && response.data.message ? response.data.message : response.status.toString();

          return ErrorHandler.alert(message, response.statusText);

        case 422:
          const errors: string[] = [];

          Object.keys(response.data.errors).forEach((name: string) => {
            errors.push(response.data.errors[name]);
          });

          message = errors.join('<br />');

          return ErrorHandler.alert(message, response.data.message ? response.data.message : 'Error');

        case 500:
          return ErrorHandler.alert(response.data.message, response.statusText);

        case 401:
          return ErrorHandler.alert('Uw credentials zijn omwille van veiligheidseisen beperkte tijd geldig. Log opnieuw in om verder te gaan met uw werk.');
      }

      return ErrorHandler.alert(response.status.toString(), response.statusText);
    }

    return ErrorHandler.alert();
  }

  public static alert(
    message = 'An unknown error occured',
    title = 'Error',
    type: DialogType = 'error',
  ) {
    const options: MiDialogOptions = {
      title,
      text: message,
      type,
      buttons: {
        confirm: {
          text: 'Ok',
        },
      },
    };

    store.dispatch('openDialog', options);
  }
}
