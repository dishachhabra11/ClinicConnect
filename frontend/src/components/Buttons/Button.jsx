import React from 'react'

function Button({ bgColor, children }) {
  return <button className={`px-6 py-2 rounded-xl ${bgColor}`}> {children}</button>;
}


export default Button;