"use client"; 

import Image from "next/image";
import styles from "./page.module.css";
import ButtonMain from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <ButtonMain className="big-button" onClick={() => console.log("Hello")}>
        Submit
      </ButtonMain>
    </div>
  );
}
