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
          src="/logo.jfif"
          alt="Hanna K-Beauty"
          width={68}
          height={68}
          sizes="(max-width: 640px) 54px, 68px"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
