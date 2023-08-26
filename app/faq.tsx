import pb from "@/helpers/pocketbase";
import FAQListItem from "./faqitem";

export default function FAQ() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">FAQ</h1>
      <FAQList />
    </div>
  );
}

async function FAQList() {
  const faqs = await pb.collection("faq").getList(1, 500);

  return (
    <div className="flex flex-col py-2 divide-y-2 divide-slate-800">
      {faqs.items.map((faq) => (
        <FAQListItem faq={faq} />
      ))}
    </div>
  );
}
