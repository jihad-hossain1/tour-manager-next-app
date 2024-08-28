"use client";

import BackButton from "@/components/ui/BackButton";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbLoaderQuarter } from "react-icons/tb";

const VerifyPage = ({ params }: { params: { id: string[] } }) => {
  const [mailFromLocal, setmailFromLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeAgain, setcodeAgain] = useState(false);
  const [error, setError] = useState("");
  const [vcode, setVcode] = useState("");
  const router = useRouter();
  const [timer, setTimer] = useState(false);


  const handleVerify = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/users/verify-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vcode, email: mailFromLocal }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }
      if (data.result) {
        toast.success("Email verified successfully. You can now login.");
        router.push("/user-login");
      }
    } catch (error) {
      console.error("Error verifying:", error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAgain = async () => {
    setcodeAgain(true);
    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/users/verify-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: mailFromLocal,sendAgain:'sendAgain' }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }
      if (data.result) {
        toast.success("Code sent successfully. Please check your email.");
        // router.push("/user-login");
        setTimer(true);
      }
    } catch (error) {
      console.error("Error verifying:", error);
      setError((error as Error).message);
    } finally {
      setcodeAgain(false);
    }
  };

  useEffect(() => {
    if (params?.id[0]) {
      const decodedEmail = decodeURIComponent(params?.id[0]);
      setmailFromLocal(decodedEmail);
    }
  }, [params?.id]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center  bg-gray-100 bg-opacity-90 px-3 py-5 md:py-16">
      <main className="md:flex bg-white border border-gray-300 shadow-xl drop-shadow-md rounded-lg relative">
        <div className="min-h-[300px] min-w-[350px]  p-5 flex flex-col gap-2">
          <p className="text-2xl ">
            Please check your email for verification Code
          </p>
          <p className="text-sm">
            We have sent a verification code to <b>{mailFromLocal}</b>
          </p>
          <div className="w-[350px] m-auto">
            <TextField
              fullWidth
              label={"Enter verification code"}
              type={"text"}
              name={"vcode"}
              id={"vcode"}
              onChange={(e) => setVcode(e.target.value)}
              value={vcode}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
              <div className="flex gap-2 items-center">
                <button
                  disabled={isLoading}
                  onClick={handleVerify}
                  className="link-btn mt-4 border border-blue-300 hover:border-blue-500"
                >
                  {isLoading ? (
                    <TbLoaderQuarter className="w-6 h-6 animate-spin" />
                  ) : <span className="text-lg">Verify</span>}
                </button>
                <button
                  disabled={codeAgain}
                  onClick={handleSendAgain}
                  className="mt-4 border border-pink-300 hover:border-pink-500 bg-pink-200 px-3 py-1 rounded text-pink-600"
                >
                  {codeAgain ? (
                    <TbLoaderQuarter className="w-6 h-6 animate-spin" />
                  ) : <span className="text-lg">Send Code</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <BackButton />
        </div>
      </main>
    </section>
  );
};

export default VerifyPage;
