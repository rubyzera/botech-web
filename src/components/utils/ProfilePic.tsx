import { binaryToImage64 } from "../../hooks/useImage64";
const ProfilePic = ({
  base64,
  binary,
  size,
}: {
  base64?: string | undefined;
  binary?: Array<number>;
  size: number;
}) => {
  const pic = binary ? binaryToImage64(binary) : base64
  return (
    <img
      style={{ borderRadius: size/2 }}
      width={size}
      height={size}
      src={pic}
      alt="not found"
    />
  );
};

export default ProfilePic;
