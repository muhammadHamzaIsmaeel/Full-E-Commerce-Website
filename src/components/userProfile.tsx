import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-4">
      <UserButton afterSignOutUrl="/" />
      {user && (
        <Link href="/my-orders" className="text-gray-600 hover:text-gray-800">
          My Orders
        </Link>
      )}
    </div>
  );
};

export default UserProfile;