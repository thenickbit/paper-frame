import { FileUploader } from "@/components/FileUploader";
import { LoginButton } from "../components/LoginButton";
import Link from "next/link";

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <LoginButton />
      <FileUploader />
      <Link href="/gallery">Go to gallery</Link>
    </main>
  );
};

export default Home;
