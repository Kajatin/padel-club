import getDb from "@/helpers/getDb";
const { db } = getDb();

export default async function Badge(props: { user: number }) {
  const { user } = props;

  const numberOfSessions = await db.one(
    'SELECT COUNT(*) FROM sessions_users WHERE "user" = $1',
    user
  );

  if (numberOfSessions.count <= 10) {
    return (
      <div className="absolute material-symbols-outlined -right-2 -bottom-1 text-green-400 bg-green-900 rounded-full p-1 opacity-90">
        eco
      </div>
    );
  }

  if (numberOfSessions.count <= 50) {
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
