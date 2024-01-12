import QuestionSegment from '@/components/QuestionSegment ';
import Title from '@/components/Title';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { ArrayQuestions } from '@/data/data';

const Question = () => {
  return (
    <>
      <section className=" bg-[url('/bg-questions.png')] xxl:bg-[url('/bg-big-questions.png')] bg-cover flex flex-col items-center pt-[193px]  h-[606px] w-full ">
        <div className="container ">
          <Title type="h1" color="light">
            Питання-відповідь
          </Title>
        </div>
      </section>
      <section className="pt-20 flex flex-col lg:items-center">
        <ul className="container ">
          {ArrayQuestions.map(({ id, title, desc, email }) => {
            return (
              <li
                key={id}
                className="bg-formBg pr-3 lg:pr-7 lg:pl-5 pl-3  rounded-[18px] mb-[22px] lg:max-w-[1076px] w-full"
              >
                <QuestionSegment title={title} desc={desc} email={email} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container pt-20 flex flex-col items-start">
        <Title type="h1" color="dark">
          Не знайшли відповідь на своє питання?
        </Title>
        <div className="block lg:flex mt-[60px] lg:justify-between w-full">
          <ul className="lg:max-w-[625px] mb-20 lg:mb-0 lg:pt-[86px]">
            <li className="pb-8">
              <p>
                Шановний клієнте,
                <br />
                Дякуємо вам за інтерес до наших продуктів та послуг. <br />
                Ми розуміємо, що іноді у вас можуть виникати питання або ситуації, які не вдається
                вирішити на нашому веб-сайті. <br />
                Ми завжди готові надати вам відповіді та допомогу.
              </p>
            </li>
            <li>
              <p>
                Якщо ви не знайшли відповідь на своє питання на нашому сайті, будь ласка,
                використовуйте цю форму, щоб надіслати нам свій запит. Ми приділяємо велику увагу
                вашим потребам і зробимо все можливе, щоб вам вчасно відповісти.
              </p>
            </li>
          </ul>
          <FormFeedback onClose={undefined} />
        </div>
      </section>
    </>
  );
};

export default Question;
