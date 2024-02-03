export default function OutOfService() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <div className="text-5xl text-yellow-400 font-bold">Padel Club</div>
      </div>
      <div className="text-center mt-14">
        Website temporarily down due to funding issues.
      </div>
      <div className="text-center">Thank you for your understanding.</div>
    </div>
  );
}
