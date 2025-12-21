interface UserInfoProps {
  fullname: string;
  email: string;
  role: string;
}

export default function UserInfo({ fullname, email, role }: UserInfoProps) {
  return (
    <div className="text-center sm:text-left">
      <h2 className="pt-20 text-2xl font-bold text-gray-600">{fullname}</h2>
      <p className="text-gray-500">{email}</p>
      <span className="inline-block mt-2 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
        {role}
      </span>
    </div>
  );
}
