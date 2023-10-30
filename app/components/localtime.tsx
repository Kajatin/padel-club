"use client";

import moment from "moment";
import { createEvent, EventAttributes } from "ics";

async function handleDownload(event: any) {
  console.log(event);
  const details = {
    title: event.title,
    description:
      "Padel session with " +
      event.participants.map((p: any) => p.name).join(", ") +
      " (more might sign up later too).",
    location: event.location,
    start: [
      event.start.getFullYear(),
      event.start.getMonth() + 1,
      event.start.getDate(),
      event.start.getHours(),
      event.start.getMinutes(),
    ],
    duration: { minutes: event.duration },
    url: "https://padel.rolandkajatin.com/sessions/" + event.id,
    status: event.booked ? "CONFIRMED" : "TENTATIVE",
    categories: ["padel"],
    classification: event.private ? "PRIVATE" : "PUBLIC",
  } as EventAttributes;

  const filename = "padel.ics";
  const file = (await new Promise((resolve, reject) => {
    createEvent(details, (error, value) => {
      if (error) {
        reject(error);
      }

      resolve(new File([value], filename, { type: "text/calendar" }));
    });
  })) as Blob;
  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export default function LocalTime(props: { event: any }) {
  const { event } = props;
  return (
    <div
      className="cursor-pointer hover:underline"
      onClick={() => handleDownload(event)}
    >
      {moment(event.start).local().format("LLLL")}
    </div>
  );
}
