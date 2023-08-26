import FAQListItem, { FAQItem } from "./faqitem";

export default function FAQ() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">FAQ</h1>
      <FAQList />
    </div>
  );
}

function FAQList() {
  const faqs: FAQItem[] = [
    {
      question: "What is Padel Club?",
      answer:
        "Padel Club is a community of padel players in Copenhagen. We organize padel sessions every week. Join us!",
    },
    {
      question: "What is Padel Club?",
      answer:
        "Padel Club is a community of padel players in Copenhagen. We organize padel sessions every week. Join us!",
    },
  ];

  return (
    <div className="flex flex-col py-2 divide-y-2 divide-slate-800">
      {faqs.map((faq) => (
        <FAQListItem faq={faq} />
      ))}
    </div>
  );
}
