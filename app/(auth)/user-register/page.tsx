'use client'

import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoLockClosedOutline } from "react-icons/io5";
import { TbLoaderQuarter } from "react-icons/tb";

const RegisterUser = () => {

  const [loading, setloading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>('');
  const [isVisible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  function toggle() {
    setVisible(!isVisible);
  };

  const [formData, setFormData] = useState({
    mobile: 0,
    password: '',
    email: '',
    name: ''
  })


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setloading(true);
      setErrors(null);

      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      })

      const json = await response.json();

      if (json?.error) {
        setloading(false);
        setErrors(json?.error);
      }
      if (json?.result) {
        setloading(false);
        toast.success("User created successfully", {
          duration: 3000, position: 'top-right', style: {
            border: 'solid 2px #4ade80',
            color: '#000000',
            borderRadius: '10px',
            padding: '10px',
          }
        });
        setFormData({
          mobile: 0,
          password: '',
          email: '',
          name: ''
        })

        setTimeout(() => {
          router.push(`/user-verify/${json?.result?.email}`);
        }, 500);
      }
    
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  return <div className="flex items-center justify-center min-h-[70vh] ">
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
          Sign Up for User
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
          id="name"
          label="Full Name"
          name="name"
          value={formData?.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          autoFocus
        />
        <TextField
          margin="normal"
          required={true}
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={formData?.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required={true}
          type="number"
          fullWidth
          id="mobile"
          label="Mobile Number"
          name="mobile"
          value={formData?.mobile}
          onChange={(e) => {
            const value = Number(e.target.value);
            setFormData({ ...formData, mobile: value > 0 ? value : '' as any });
          }}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-full p-3 flex justify-center items-center text-white font-semibold rounded-lg shadow-md"


        >
          {
            loading ? <TbLoaderQuarter className="animate-spin " size={23} /> : "Sign Up"
          }
        </button>
        <div className="mt-3 flex justify-between">
          <Grid item xs>
            <Link href="#" >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/user-login" >
              {"Go back to Login"}
            </Link>
          </Grid>
        </div>
      </Box>
    </div>
  </div>

};

export default RegisterUser;
