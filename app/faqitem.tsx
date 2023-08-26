"use client";

import { useState } from "react";
import { RecordModel } from "pocketbase";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQListItem({ faq }: { faq: RecordModel }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex flex-col py-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div
        className={
          "flex items-center justify-between w-full font-medium text-left text-lg " +
          (open ? "" : "text-slate-300")
        }
      >
        <span>{faq.question}</span>
        <svg
          className={
            "w-3 h-3 shrink-0 transition-all " +
            (open ? "rotate-0" : "rotate-180")
          }
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </div>

      {open && <p className="mt-2 text-slate-300">{faq.answer}</p>}
    </div>
  );
}
