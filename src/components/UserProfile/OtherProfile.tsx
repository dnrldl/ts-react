import React from "react";

interface OtherProfileProps {
  nickname: string;
}

const OtherProfile = ({ nickname }: OtherProfileProps) => {
  return (
    <div>
      <h1>Other Profile</h1>
    </div>
  );
};

export default OtherProfile;
