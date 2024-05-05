import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSession } from 'next-auth/react';
import { useReactToPrint } from 'react-to-print';

interface Props {
  summ: string;
}

const AccountInPdf = ({ summ }: Props) => {
  const { data: session, status } = useSession();
  const userName = session?.user.user_name;
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); // Dodaje zero przed jednocyfrowymi dniami
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Dodaje zero przed jednocyfrowymi miesiącami
  
  const formattedDate = `${day}.${month}.${currentDate.getFullYear()}`;
  const numberOfAcount = `${day}/${month}/${currentDate.getFullYear()}`;

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgHeight = (canvas.height * 200) / canvas.width;
    const marginLeft = 10;
    const marginRight = 10;
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      marginLeft,
      10,
      210 - marginLeft - marginRight,
      imgHeight
    );
    pdf.save('Рахунок-фактура.pdf');
  };

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    bodyClass: 'print-page',
  });

  return (
    <div className="w-[1000px]  bg-white p-12 font-semibold text-xl">
      <div ref={contentRef} className="py-12 border-b-2  border-t-2">
        <ul className="flex mb-8">
          <li className="mr-8">
            <p>ОДЕРЖУВАЧ:</p>
          </li>
          <li>
            <p> ТОВ &quot;Інноваційні медіа рішення &ldquo; </p>
            <p>
              <span className="font-bold">КОД ЄДРПОУ:</span> 37723560{' '}
            </p>
            <p>
              <span className="font-bold">Рахунок:</span> UA07300528000002600900003653{' '}
            </p>
            <p>
              <span className="font-bold"> МФО:</span> 300528
            </p>
            <p>
              <span className="font-bold">Банк одержувача:</span> АТ &quot;ОТП БАНК&quot; в м.
              Київ
            </p>
          </li>
        </ul>
        <ul className="flex mb-8">
          <li className="mr-8">
            <p>ПЛАТНИК:</p>
          </li>
          <li className=" ml-5">
            <p>__________________________________</p>
          </li>
        </ul>
        <p className="text-center mb-8">
          Рахунок-фактура {numberOfAcount} <br /> від <span className="font-bold">{formattedDate}</span>
        </p>
        <p className="mb-8">
          Послуги з СМС-Розсилки. Імя на сайті: <span className="font-bold">{userName}</span>
        </p>
        <p className="text-right">
          Разом з ПДВ - <span className="font-bold">{summ}</span>грн
        </p>
        <p></p>
        <p></p>
      </div>
      <div className="flex justify-between items-center">
        <button
          className={`block mt-2 text-emailColorLink hover:opacity-80 focus:opacity-80`}
          onClick={handleDownloadPDF}
        >
          Завантажити рахунок в PDF
        </button>
        <button
          onClick={handlePrint}
          className={`block mt-2 text-emailColorLink hover:opacity-80 focus:opacity-80`}
        >
          Роздрукувати рахунок
        </button>
      </div>
    </div>
  );
};

export default AccountInPdf;
