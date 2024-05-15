export const EnterOnlyFigures = (e:React.KeyboardEvent<HTMLInputElement>) => {
  const keyCode = e.keyCode || e.which;
  const key = e.key;

  const isNumber = keyCode >= 48 && keyCode <= 57;
  const isControlKey = keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39;
  const isMinus = key === '-' && e.currentTarget.selectionStart === 0;

  const isAllowed = isNumber || isControlKey || isMinus;

  if (!isAllowed) {
    e.preventDefault();
  }
};
