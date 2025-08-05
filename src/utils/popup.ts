export const openWindow = (
  url: string,
  width: number = 600,
  height: number = 600,
  name: string = "popup"
): Window | null => {
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const popup = window.open(
    url,
    name,
    `width=${width},height=${height},top=${top},left=${left},resizeable=yes`
  );

  if (popup) {
    popup.focus();
  }

  return popup;
};
