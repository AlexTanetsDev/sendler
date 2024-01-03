import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import formatTableDate from "@/app/utils/formatTableDate";
import Title from "@/components/Title";

export default async function HistoryDetails() {

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Детальна статистика
      </Title>
    </section>
  );
}
