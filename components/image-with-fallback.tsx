import Image from "next/image";

const UserProfileImage = ({
  user,
  width,
  height,
}: {
  user: any;
  width: number;
  height: number;
}) => {
  // Define a fallback image URL
  const fallbackImageUrl = "/userPic.png"; // Replace with your fallback image path

  // Use the fallback image if user.imageUrl is not available
  const imageUrl = user?.imageUrl || fallbackImageUrl;

  return (
    <Image
      className="rounded-full"
      src={imageUrl}
      width={width}
      height={height}
      alt="profile-url"
      unoptimized
    />
  );
};

export default UserProfileImage;