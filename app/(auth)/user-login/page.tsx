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
    mobile: '',
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

    console.log(formData)

    try {
      const res = await signIn("credentials", {
        mobile: formData?.mobile,
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

  return <PageContainer>
    <div className="my-20">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
        }}
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
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            defaultValue={formData?.mobile}
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
      </Box>
    </div>

  </PageContainer>;
};

export default UserLoginpage;
