import { ProfileSkeleton } from "@/components/profile/profile";

const UserLoading = () => {
  return (
    <div className="h-full">
      <ProfileSkeleton />
    </div>
  );
};

export default UserLoading;
