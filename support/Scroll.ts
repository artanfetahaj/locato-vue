export const removeBodyScroll = ():void => {
  document.body.classList.add('overflow-hidden');
};

export const addBodyScroll = (): void => {
  document.body.classList.remove('overflow-hidden');
};
