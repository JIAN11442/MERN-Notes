'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="
        fixed
        inset-0
      "
    >
      <div
        onClick={() => setCount((c) => c + 1)}
        className="
        fixed
        top-[50%]
        left-[50%]
        translate-x-[-50%]
        translate-y-[-50%]
      "
      >
        <button type="button" className="btn btn-primary">
          Click {count}
        </button>
      </div>
    </div>
  );
}
