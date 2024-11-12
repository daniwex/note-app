import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <form className="bg-white py-10 px-8 w-[93%] sm:w-1/3 rounded-lg">
        <div className="flex justify-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Note Icon"
            width="100"
            height="100"
          />
        </div>

        <div className="text-black text-center pt-8">
          <h1 className="text-xl font-bold pb-2">Forgotten your password?</h1>
          <p className="text-xs text-gray-600">{"Enter your email below, and we'll send you a link to reset it"}</p>
        </div>

        <div className="pt-8 grid gap-y-3 text-black text-sm">
          <div className="grid gap-y-1">
            <label className="">Email Address</label>
            <input type="text" placeholder="email@example.com" className="border p-2 rounded-md" />
          </div>
          <button className="bg-blue500 text-white flex justify-center items-center gap-x-2 py-2 rounded-md">
            Send Reset Link
          </button>
        </div>
      </form>
  )
}
