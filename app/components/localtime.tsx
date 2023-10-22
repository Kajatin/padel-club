"use client";

import moment from "moment";
import { createEvent } from 'ics';

async function handleDownload(event: any) {
  const moment_start = moment(event.start)
  const duration = event.duration
  const moment_end = moment_start.add({ "minutes": duration })

  const details = {
    title: "Padel Club",
    start: moment_start.format('YYYY-M-D-H-m').split("-").map(Number),
    end: moment_end.format("YYYY-M-D-H-m").split("-").map(Number)
  }

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

export default function LocalTime(props: { event: any }) {
  const { event } = props;
  return <div onClick={() => handleDownload(event)}>{moment(event.start).local().format("LLLL")}</div>;
}
