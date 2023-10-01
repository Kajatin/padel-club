import moment from "moment";

import Address from "@/app/address";
import Interaction from "./interaction";
import Navigation from "@/app/navigation";
import { Host, Participants } from "@/app/events";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function PaySession(props: { id: string; session: any }) {
  const { id, session } = props;

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <h1 className="text-3xl text-slate-400 font-medium">Pay for session</h1>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl text-slate-400 font-medium">{session.title}</h2>

        <Participants participants={session.participants} />

        <div className="flex flex-row gap-2">
          <p className="bg-slate-400 text-slate-900 text-sm px-1 py-0.5 rounded">
            expired
          </p>
          {session.private && (
            <p className="inline bg-blue-400 text-blue-900 rounded text-sm px-1 py-0.5">
              private
            </p>
          )}
          <div className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.price} DKK
          </div>
          <p className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.duration} min
          </p>
        </div>

        <div>{moment(session.start).format("LLLL")}</div>

        <Address address={session.location} />

        {session.host && <Host host={session.host} />}
      </div>

      <Interaction id={id} session={session} />
    </div>
  );
}
