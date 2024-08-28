'use client';

import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/ui/pageContainer";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserLoginpage = () => {
  const router = useRouter()
  const [loading, setloading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>('');
  const [isVisible, setVisible] = useState<boolean>(false);

  function toggle() {
    setVisible(!isVisible);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })



  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await signIn("credentials", {
        uemail: formData?.email,
        password: formData?.password,
        redirect: false,
        for: "user",
      });

      if (res.error) {
        setErrors(res.error);
        toast.error(res.error);
        setloading(false);
        return;
      }
      // setloading(true)
      router.refresh();
      router.push("/user-dashboard");
    } catch (error) {
      console.log(error)
    }
  }


  const handleSendAgain = async () => {
    try {
      const response = await fetch("/api/v1/users/verify-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData?.email, sendAgain: 'sendAgain' }),
      });

      const data = await response.json();


    } catch (error) {
      console.error("Error verifying:", error);

    }
  };

  return <PageContainer>
    <div className="flex items-center justify-center min-h-[70vh] ">
      <CssBaseline />
      <div
        className="max-sm:w-[350px] w-[700px] border max-sm:p-3 p-20 shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-lg"
      >

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <IoLockClosedOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in for User
          </Typography>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {errors && <p className="text-red-500 text-sm">{errors}  {errors == "email Number are not verifyed" && <button onClick={() => {
            handleSendAgain()
            router.push(`/verify-email/${formData?.email}`)
          }} className="text-blue-500 underline font-bold">Verify Email</ button >} </p>}
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            defaultValue={formData?.email}
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
              defaultValue={formData?.password}
              onChange={handleChange}
              id="password"

            />
            <span className="absolute z-10 right-4 top-8" onClick={toggle}>
              {isVisible ? <IoMdEye size={20} className="cursor-pointer" /> : <IoMdEyeOff size={20} className="cursor-pointer" />}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user-register" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>

  </PageContainer>;
};

export default UserLoginpage;
