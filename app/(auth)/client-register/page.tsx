'use client';

import PageContainer from "@/components/ui/pageContainer";
import { CssBaseline, Avatar, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, Box } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ClientRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>('');
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isClient, setClient] = useState<string | null>('');
  const [success, setSuccess] = useState<string | null>('');
  const router = useRouter();
  function toggle() {
    setVisible(!isVisible);
  }

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    clientType: "",
  })

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement | HTMLSelectElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('/api/v1/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, clientType: isClient })
      });

      const result = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(result.error);
        toast.error(result.error);
        console.log(result);
      }

      if (response.ok) {
        setLoading(false);
        console.log(result);
        setSuccess(result.message);
        toast.success(result.message);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          password: "",
          clientType: "",
        });
        setClient("");
        setErrors(null);
        // toast.success("Client registered successfully");
        router.push("/client-login");
      }

    } catch (error) {
      console.log(error)
      toast.error(error.error);
    }
  }


  return <>
    <PageContainer>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <IoLockClosedOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for Client
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {errors && <p className="text-red-500 text-sm my-3">{errors}</p>}
          {success && <p className="text-green-500 text-sm my-3">{success}</p>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                value={formData?.name}
                onChange={handleChange}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="mobile Number"
                name="mobile"
                value={formData?.mobile}
                onChange={handleChange}
                autoComplete="mobile"
              />
            </Grid>
            <Grid item xs={12}>
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  id="password"
                  value={formData?.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2">
                  {isVisible ? <IoMdEyeOff onClick={toggle} /> : <IoMdEye onClick={toggle} />}
                </span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 0, minWidth: 120 }} fullWidth>
                <InputLabel id="demo-simple-select-label">Client Type</InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isClient}
                  label="Client Type"
                  onChange={(e) => setClient(e.target.value)}
                  name="clientType"
                >
                  <MenuItem value="TourGuide">Tour Guide</MenuItem>
                  <MenuItem value="CarRent">Car Rent</MenuItem>
                  <MenuItem value="ParkingShare">Parking Share</MenuItem>
                  <MenuItem value="ReturantManagement">Returant Management</MenuItem>
                  <MenuItem value="HotelManagement">Hotel Management</MenuItem>
                  <MenuItem value="Blogger">Blogger</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="image"
                label="Image Url"
                type="text"
                id="image"
                defaultValue={formData?.image}
                onChange={handleChange}
                autoComplete="new-image"
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            className="bg-blue-500 text-white hover:bg-blue-600"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/client-login" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  </ >
};

export default ClientRegister;
