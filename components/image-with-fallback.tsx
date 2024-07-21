import Image from "next/image"; // Make sure you're importing the Image component correctly

const UserProfileImage = ({ user }: { user: any }) => {
  // Define a fallback image URL
  const fallbackImageUrl = "/userPic.png"; // Replace with your fallback image path

  // Use the fallback image if user.imageUrl is not available
  const imageUrl = user?.imageUrl || fallbackImageUrl;

  return (
    <Image
      className="rounded-full"
      loader={({ src }) => src}
      src={imageUrl}
      width={60}
      height={60}
      alt="profile-url"
    />
  );
};

export default UserProfileImage;
