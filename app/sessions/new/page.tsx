"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Navigation from "@/app/navigation";
import { useMembers } from "@/helpers/hooks";
import { generateMonogram, stringToColor } from "@/helpers/utils";

export default function NewSession() {
  const [session, setSession] = useState({
    title: "Padel session",
    start: new Date(),
    duration: 60,
    location: "",
    price: 180,
    booked: false,
    private: false,
    participants: [] as number[],
  });

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <div className="flex flex-row justify-between items-center mb-10">
        <div className="text-4xl text-yellow-400 font-bold">Create session</div>
      </div>

      <SessionForm session={session} setSession={setSession} edit={false} />
    </div>
  );
}

export function SessionForm(props: {
  session: any;
  setSession: (session: any) => void;
  edit: boolean;
}) {
  const { session, setSession, edit } = props;

  const router = useRouter();

  const { members, isLoading, isError } = useMembers();

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Session Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={session.title}
          onChange={(e) => setSession({ ...session, title: e.target.value })}
          className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="start">Date (UTC)</label>
        <div className="flex flex-row gap-2">
          <input
            type="date"
            name="start"
            id="start"
            value={session.start.toISOString().slice(0, 10)}
            onChange={(e) => {
              setSession((prev: any) => {
                const newDate = new Date(
                  Date.UTC(
                    parseInt(e.target.value.slice(0, 4)),
                    parseInt(e.target.value.slice(5, 7)) - 1,
                    parseInt(e.target.value.slice(8, 10)),
                    prev.start.getUTCHours(),
                    prev.start.getUTCMinutes()
                  )
                );

                return { ...prev, start: newDate };
              });
            }}
            className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
          />
          <input
            type="time"
            name="start"
            id="start"
            value={session.start.toISOString().slice(11, 16)}
            onChange={(e) => {
              setSession((prev: any) => {
                const newDate = new Date(
                  Date.UTC(
                    prev.start.getUTCFullYear(),
                    prev.start.getUTCMonth(),
                    prev.start.getUTCDate(),
                    parseInt(e.target.value.slice(0, 2)),
                    parseInt(e.target.value.slice(3, 5))
                  )
                );

                return { ...prev, start: newDate };
              });
            }}
            className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          id="duration"
          min={0}
          value={session.duration}
          onChange={(e) =>
            setSession({ ...session, duration: parseInt(e.target.value) })
          }
          className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
        />
        <div className="text-sm text-slate-400">
          The length of the padel session given in minutes.
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location">Address</label>
        <input
          type="text"
          name="location"
          id="location"
          value={session.location}
          onChange={(e) => setSession({ ...session, location: e.target.value })}
          className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          min={0}
          value={session.price}
          onChange={(e) =>
            setSession({ ...session, price: parseInt(e.target.value) })
          }
          className="border-2 border-slate-800 px-4 py-2 rounded w-full bg-transparent"
        />
        <div className="text-sm text-slate-400">
          The total price of the session (court booking + equipment rental)
          given in DKK.
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="booked">Booked</label>
        <input
          type="checkbox"
          name="booked"
          id="booked"
          checked={session.booked}
          onChange={(e) => setSession({ ...session, booked: e.target.checked })}
          className="border-2 border-slate-800 px-4 py-2 rounded w-full h-6 bg-transparent transition-all"
        />
        <div className="text-sm text-slate-400">
          {session.booked ? (
            <span>The court has already been booked.</span>
          ) : (
            <span>The court has not yet been booked.</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="private">Private</label>
        <input
          type="checkbox"
          name="private"
          id="private"
          checked={session.private}
          onChange={(e) =>
            setSession({ ...session, private: e.target.checked })
          }
          className="border-2 border-slate-800 px-4 py-2 rounded w-full h-6 bg-transparent transition-all"
        />
        <div className="text-sm text-slate-400">
          {session.private ? (
            <span>
              Session is private. Only invited participants can join the
              session.
            </span>
          ) : (
            <span>Session is public. Anyone can join the session.</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-3 items-baseline">
          <label htmlFor="private">Participants</label>
          <div className="text-sm text-slate-300">
            {session.participants.length} invited
          </div>
        </div>

        {isError && (
          <div className="text-sm text-slate-400">Error loading members.</div>
        )}

        {members && !isError && (
          <div className="flex flex-row flex-wrap gap-4">
            {members.map((member) => {
              const isParticipant = session.participants.includes(member.id);

              return (
                <button
                  type="button"
                  key={member.id}
                  className={
                    "flex flex-row sm:flex-col items-center gap-6 sm:gap-2 group hover:scale-105 transition-all hover:grayscale-0 " +
                    (isParticipant ? "" : "grayscale")
                  }
                  onClick={() => {
                    if (isParticipant) {
                      setSession((prev: any) => ({
                        ...prev,
                        participants: prev.participants.filter(
                          (p: any) => p !== member.id
                        ),
                      }));
                    } else {
                      setSession((prev: any) => ({
                        ...prev,
                        participants: [...prev.participants, member.id],
                      }));
                    }
                  }}
                >
                  <div className="relative">
                    {member.avatar ? (
                      <Image
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full"
                        src={member.avatar}
                        alt={member.name}
                      />
                    ) : (
                      <div
                        className="flex w-16 h-16 rounded-full font-medium text-2xl items-center justify-center"
                        style={{
                          backgroundColor: stringToColor(member.name),
                        }}
                      >
                        {generateMonogram(member.name)}
                      </div>
                    )}
                    <p className="opacity-0 group-hover:opacity-100 absolute bottom-0 text-xs bg-slate-950 bg-opacity-40 p-1 rounded">
                      {member.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {edit ? (
        <>
          <button
            type="submit"
            className="flex flex-row gap-2 mt-6 items-center border-2 border-yellow-800 px-4 py-2 rounded w-full font-medium justify-center transition-all hover:bg-yellow-800"
            onClick={async (e) => {
              e.preventDefault();
              await fetch(`/api/sessions/${session.id}`, {
                method: "POST",
                body: JSON.stringify(session),
              }).then((res) => {
                if (res.ok) {
                  router.replace(`/`);
                } else {
                  alert("Error updating session");
                }
              });
            }}
          >
            Update
          </button>

          <button
            className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center transition-all hover:bg-slate-800"
            onClick={async (e) => {
              e.preventDefault();
              await fetch(`/api/sessions/${session.id}`, {
                method: "DELETE",
              }).then((res) => {
                if (res.ok) {
                  router.replace(`/`);
                } else {
                  alert("Error deleting session");
                }
              });
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="flex flex-row gap-2 mt-6 items-center border-2 border-yellow-800 px-4 py-2 rounded w-full font-medium justify-center transition-all hover:bg-yellow-800"
          onClick={async (e) => {
            e.preventDefault();
            await fetch("/api/sessions", {
              method: "PUT",
              body: JSON.stringify(session),
            }).then((res) => {
              if (res.ok) {
                router.replace(`/`);
              } else {
                alert("Error creating session");
              }
            });
          }}
        >
          Create
        </button>
      )}
    </form>
  );
}
