export const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
  const keyCode = e.keyCode || e.which;

  const isAllowed = (keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 46;

  if (!isAllowed) {
    e.preventDefault();
  }
};