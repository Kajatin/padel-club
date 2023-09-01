"use client";

export default function Address(props: { address: string }) {
  const { address } = props;

  return (
    <div
      className="cursor-pointer text-slate-300 hover:text-slate-400 transition-all"
      onClick={() => {
        const encodedAddress = encodeURIComponent(address);
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
          "_blank"
        );
      }}
    >
      {address}
    </div>
  );
}
