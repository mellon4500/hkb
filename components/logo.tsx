"use client";

import Image from "next/image";
import { useState } from "react";

export function Logo() {
  const [failed, setFailed] = useState(false);

  return (
    <span className="logo">
      {failed ? (
        <span className="logo-text">hanna<span>K-BEAUTY</span></span>
      ) : (
        <Image
          src="/Watercolour Cherry Blossom Beauty Logo.png"
          alt="Hanna K-Beauty"
          width={2172}
          height={724}
          sizes="(max-width: 640px) 174px, 204px"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
