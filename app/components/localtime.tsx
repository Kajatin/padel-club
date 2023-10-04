"use client";

import moment from "moment";

export default function LocalTime(props: { time: string }) {
  const { time } = props;

  return <div>{moment(time).local().format("LLLL")}</div>;
}
