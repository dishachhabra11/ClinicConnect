import React from "react";

function Avatar({ width = "w-10", height = "h-10", rounded="rounded-full" }) {
  return (
    <div className="avatar">
      <div className={`${width} ${height} ${rounded} ring ring-offset-2`}>
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" className={`${width} ${height}`} />
      </div>
    </div>
  );
}

export default Avatar;
