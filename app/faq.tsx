import getDb from "@/helpers/getDb";
const { db } = getDb();

import FAQListItem from "./faqitem";

export default function FAQ() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">FAQ</h1>
      {/* @ts-expect-error Server Component */}
      <FAQList />
    </div>
  );
}

async function FAQList() {
  const faqs = await db.any("SELECT * FROM faq");

  return (
    <div className="flex flex-col py-2 divide-y-2 divide-slate-800">
      {faqs.map((faq) => (
        <FAQListItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
