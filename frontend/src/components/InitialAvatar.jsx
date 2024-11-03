import React from "react";

const InitialAvatar = ({ width, height, initials }) => {
  return (
    <div>
      <div class={`relative inline-flex items-center justify-center ${width} ${height} overflow-hidden rounded-full ring ring-offset-2 `}>
        <span class="text-md text-gray-800 ">{initials}</span>
      </div>
    </div>
  );
};

export default InitialAvatar;
