export default function Badge(props: { created: string }) {
  const created = new Date(props.created);

  const createdSince = Math.floor(
    (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (createdSince <= 30) {
    return (
      <div className="absolute material-symbols-outlined -right-2 -bottom-1 text-green-400 bg-green-900 rounded-full p-1 opacity-90">
        eco
      </div>
    );
  }

  if (createdSince <= 180) {
    return (
      <div className="absolute material-symbols-outlined -right-2 -bottom-1 text-blue-400 bg-blue-900 rounded-full p-1">
        sports_tennis
      </div>
    );
  }

  return (
    <div className="absolute material-symbols-outlined -right-2 -bottom-1 text-yellow-400 bg-yellow-900 rounded-full p-1">
      sports_baseball
    </div>
  );
}
