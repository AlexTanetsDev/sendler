export const publicNavigation = [
  { id: 1, title: 'Головна', path: '/' },
  { id: 2, title: 'Про нас', path: '/about' },
  { id: 3, title: 'Ціни', path: '/prices' },
  { id: 4, title: 'Питання', path: '/questions' },
  { id: 5, title: 'Послуги', path: '/services' },
  { id: 6, title: 'Контакти', path: '#footer' },
];

export const privateNavigation = [
  { id: 1, title: 'Розсилка', path: '/mailing-list' },
  { id: 2, title: 'Управління контактами', path: '/groups' },
  { id: 3, title: 'Статистика', path: '/statistics' },
  { id: 4, title: 'Особистий кабінет', path: '/account' },
];

export const privateNavigationAdmin = [
  { id: 1, title: 'Admin Home Page', path: '/admin' },
  { id: 2, title: 'Sender Name Approved', path: '/sender-name-approved' },
  { id: 3, title: 'General Statistics', path: '/general-statistics' },
  { id: 4, title: 'Debts', path: '/debts' },
];

export const ArrayQuestions = [
  {
    id: 1,
    title: 'Кому я можу надсилати повідомлення?',
    desc: " За законом 'Про рекламу' повідомлення можна розсилати абонентам, які дали згоду на їх отримання. Тільки в такому разі масове розсилання SMS-повідомлень не є спамом.",
    email: undefined,
  },
  {
    id: 2,
    title: 'Чи можу я в тексті повідомлення індивідуально звертатися до абонента?',
    desc: 'Так. У текст повідомлення можна встановити будь-яке поле для груп абонентів. Наприклад, ви можете підставити П.І.Б. абонента та два додаткові параметри (якщо такі дані містяться у групі абонентів).',
    email: undefined,
  },
  {
    id: 3,
    title: 'Наскільки важко розібратися в інтерфейсі сервісу?',
    desc: "Дуже просто. Від 2 до 15 хвилин в залежності від вашого рівня комп'ютера. У разі труднощів зручні підказки допоможуть розібратися. У разі виникнення дивних та незрозумілих ситуацій просимо звертатися до служби підтримки.",
    email: undefined,
  },
  {
    id: 4,
    title:
      'Чи можу я інтегрувати Bsender.com.ua зі своєю CRM-системою, сайтом, інтернет-магазином?',
    desc: "Так, у сервісу є API, підключитися до сервісу просто за наявності грамотного розробника. У разі питань, пов'язаних з технічною частиною, просимо звертатися до служби підтримки, з питань щодо умов використання та взаєморозрахунків — до комерційної служби ",
    email: 'info@bsender.com.ua.',
  },
  {
    id: 5,
    title: 'До яких країн можна надіслати SMS-повідомлення за допомогою Bsender та яка ціна ?',
    desc: "SMS-повідомлення можна надіслати на всіх GSM-операторів України. Ціна не залежить від оператора. Відправлення в інші країни (країни СНД та весь світ) у загальному порядку ми плануємо організувати у найближчому майбутньому. Зараз можливе індивідуальне відправлення повідомлень країнами СНД та світу, просимо зв'язатися з комерційною службою info@bsender.com.ua.",
    email: 'info@bsender.com.ua.',
  },
];

export const AboutMarketing = [
  {
    id: 1,
    title: 'Мобільний маркетинг',
    iconPath: '/svg/service-mobile.svg',
    alt: 'Mobile marketing',
  },
  {
    id: 2,
    title: 'Масові та цільові СМС-Розсилання',
    iconPath: '/svg/service-comment.svg',
    alt: 'SMS-Mailing',
  },
  {
    id: 3,
    title: 'Короткі СМС-Номери: СМС-Сервіси, акції',
    iconPath: '/svg/service-tags.svg',
    alt: 'SMS-Services, promotions',
  },
  {
    id: 4,
    title: 'Розробка Інтернет-сайтів (WEB-сайтів)',
    iconPath: '/svg/service-settings.svg',
    alt: 'Development of Internet sites',
  },
  {
    id: 5,
    title: 'Мобільний контент (Відео, рингтони, ігри та інший мультимедійний контент)',
    iconPath: '/svg/service-play-circle.svg',
    alt: 'Mobile multimedia content',
  },
  {
    id: 6,
    title: 'Голосові послуги: "гарячі" лінії, IVR-рішення',
    iconPath: '/svg/service-servmobile.svg',
    alt: 'Voice services',
  },
];

export const PricesArray = [
  { id: 1, count: '1-999', price: 0.77, desc: '' },
  { id: 2, count: '1000-4999', price: 0.74, desc: '(від 740 грн)' },
  { id: 3, count: '5000-9999', price: 0.73, desc: '(від 3 650 грн)' },
  { id: 4, count: '10000-49999', price: 0.72, desc: '(від 7 200 грн)' },
  { id: 5, count: '50000-99999', price: 0.71, desc: '(від 35 500 грн)' },
  { id: 6, count: '100000-499999', price: 0.7, desc: '(від 70 000 грн)' },
  { id: 7, count: '500000 i бiльше', price: null, desc: 'договірна' },
];

export const months  = [
  { id: 1, value: 'січень', label: 'Січень' },
  { id: 2, value: 'лютий', label: 'Лютий' },
  { id: 3, value: 'березень', label: 'Березень' },
  { id: 4, value: 'квітень', label: 'Квітень' },
  { id: 5, value: 'травень', label: 'Травень' },
  { id: 6, value: 'червень', label: 'Червень' },
  { id: 7, value: 'липень', label: 'Липень' },
  { id: 8, value: 'серпень', label: 'Серпень' },
  { id: 9, value: 'вересень', label: 'Вересень' },
  { id: 10, value: 'жовтень', label: 'Жовтень' },
  { id: 11, value: 'листопад', label: 'Листопад' },
  { id: 12, value: 'грудень', label: 'Грудень' }
];