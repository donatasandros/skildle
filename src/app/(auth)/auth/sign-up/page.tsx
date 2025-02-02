import { SignInForm } from "@/features/auth/components/sign-in-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-[360px] mx-auto">
      <div className="flex mb-6 flex-col items-center gap-y-6">
        <Image src="/icon.svg" alt="Logo" width={48} height={48} />
        <div className="space-y-3 text-center">
          <h1 className="font-semibold text-3xl text-gray-900">Create an account</h1>
          <p className="text-gray-600">Sign up in less than 2 minutes.</p>
        </div>
      </div>
      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg flex">
        <Link
          href="/auth/sign-up"
          className=" flex-1 rounded-lg bg-white outline outline-gray-300 text-gray-700 shadow-sm text-sm font-semibold py-2 text-center"
        >
          Sign up
        </Link>
        <Link
          href="/auth/login"
          className="text-sm font-semibold flex-1 py-2 text-gray-500 text-center"
        >
          Log in
        </Link>
      </div>
      <SignInForm />
    </div>
  );
}
