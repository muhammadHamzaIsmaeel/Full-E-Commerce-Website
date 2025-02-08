import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { RiAccountPinCircleFill } from "react-icons/ri";
import UserProfile from "./userProfile";

const AuthSection = () => {
  return (
    <>
      {/* Show Sign In button when user is signed out */}
      <SignedOut>
        <SignInButton>
          <button
            className="text-gray-600 hover:text-gray-800"
            aria-label="Sign In"
          >
            <RiAccountPinCircleFill size={24} />
          </button>
        </SignInButton>
      </SignedOut>

      {/* Show UserProfile when user is signed in */}
      <SignedIn>
        <UserProfile /> {/* Your custom UserProfile component */}
      </SignedIn>
    </>
  );
};

export default AuthSection;