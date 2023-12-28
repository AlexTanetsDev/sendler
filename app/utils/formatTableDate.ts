export default function formatTableDate(inputDate: Date): string {
  const date = new Date(inputDate);

  return new Intl.DateTimeFormat().format(date);
}