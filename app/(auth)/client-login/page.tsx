'use client';

import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingDiv from "@/components/loading/LoadingDiv";

const ClientLoginPage = () => {
  const { data, status } = useSession();
  let adminRole = data?.user?.role == "admin";
  let clientRole = data?.user?.role == "client";
  const router = useRouter();
  const [loading, setloading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>("");
  const [isVisible, setVisible] = useState<boolean>(false);

  function toggle() {
    setVisible(!isVisible);
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setloading(true);
      const res = await signIn("credentials", {
        email: formData?.email,
        password: formData?.password,
        redirect: false,
        // for: "client",
      });

      if (res.error) {
        setloading(false);
        setErrors(res.error);
        toast.error(res.error);
        return;
      }
      setloading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (adminRole) {
      router.push("/super-admin-dashboard");
    } else if (clientRole) {
      router.push("/client-dashboard");
    }
  }, [adminRole, clientRole, router]);

  if (status === "loading") {
    return <LoadingDiv />;
  }

  return (
    <div className="bg-slate-200  h-screen flex justify-center items-center">
      <div className="max-sm:px-5 px-10 py-8 rounded-2xl bg-white max-sm:w-[380px] w-[500px] shadow relative">

        <CssBaseline />
        
          <div
           className="flex justify-center flex-col items-center"
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <IoLockClosedOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login for Client
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
          >
            {errors && <p className="text-red-500 text-sm py-3">{errors}</p>}
            <TextField
              margin="normal"
              required={true}
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              autoFocus
            />
            <div className="relative">
              <TextField
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type={!isVisible ? "password" : "text"}
                value={formData?.password}
                onChange={handleChange}
                id="password"
              />
              <span className="absolute z-10 right-4 top-8" onClick={toggle}>
                {isVisible ? (
                  <IoMdEye size={20} className="cursor-pointer" />
                ) : (
                  <IoMdEyeOff size={20} className="cursor-pointer" />
                )}
              </span>
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              className="bg-blue-500 hover:bg-blue-600"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/client-register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
       
       <div className="absolute z-10 bottom-0 right-0">
        <Link href={'/'} className="rounded-br-xl rounded-tl-xl shadow-md px-3 py-2 bg-blue-600 text-white">Back to Home</Link>
       </div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
