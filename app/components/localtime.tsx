"use client";

import moment from "moment";
import { createEvent } from 'ics';

async function handleDownload(event: any) {
  const filename = 'padel.ics'
  const file = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(new File([value], filename, { type: 'text/calendar' }))
    })
  }) as Blob;
  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export default function LocalTime(props: { time: string, duration: number, is_future_event: boolean }) {
  const { time, duration, is_future_event } = props;

  const moment_start = moment(time)
  const moment_end = moment_start.add({ "minutes": duration })

  const details = {
    title: "Padel Club",
    start: moment_start.format('YYYY-M-D-H-m').split("-").map(Number),
    end: moment_end.format("YYYY-M-D-H-m").split("-").map(Number)
  }

  return <div className="w-full flex flex-row justify-between">
    {moment_start.local().format("LLLL")}
    {is_future_event ? <button onClick={() => handleDownload(details)} className="hover:underline">📅 Add to calendar</button> : null}
  </div >;
}
