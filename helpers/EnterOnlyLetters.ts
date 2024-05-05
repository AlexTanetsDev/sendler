export const EnterOnlyLetters = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const keyCode = event.keyCode || event.which;
  if (keyCode >= 48 && keyCode <= 57) {
    event.preventDefault();
  }
}