import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Page({name}: {name: string}) {
  return (
    <main>
      <p>新しいアプリ {name}</p>
      <p>{process.env.APP_ENDPONT}</p>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.APP_ENDPONT}/api/hello`)
  let response;
  if (res.ok) {
    response = await res.json();
    console.log("レスポンスOK", response)
  } else {
    response = { name: "Api call Error..."}
  }

  return {props: response}
}