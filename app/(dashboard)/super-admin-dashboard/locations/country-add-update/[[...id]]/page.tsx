'use client'

import PageContainer from '@/components/ui/pageContainer'
import { getAllContinents } from '@/service/query/continentQuery'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { createCountry } from '@/service/mutation/countryMutation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getCountry } from '@/service/query/countryQuery'

const AddwithUpdatepage = ({ params }) => {
    const [loading, setLoading] = useState(false)
    const [continents, setContinents] = useState([])
    const [continentId, setContinentId] = useState("")
    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')
    const [isEdit, setIsEdit] = useState(false);
    const [userId, setUserId] = useState(null);
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllContinents()
            setContinents(response?.data)
        }
        fetchData()
    }, []);


    useEffect(() => {
        if (params?.id) {
            fetchCountryData(params?.id);
            setIsEdit(true);
            // setUserId(params?.id);
        }
    }, [params?.id]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({ ...formData, continentId })

        try {

            setLoading(true)

            const result = await createCountry({ ...formData, continentId });

            console.log(result)

            setLoading(false);

            if (result?.data?.id) {
                setLoading(false)
                setSuccess(result?.data?.name)
                toast.success("Country created successfully")
            }
        } catch (error) {
            console.log(error);
        }

    }

    async function fetchCountryData(id: string) {
        try {
            const response = await getCountry(id);

            console.log(response?.data)

            setFormData({
                name: response?.data?.name || "",
                description: response?.data?.description || "",

            });

        } catch (error) {
            console.error("Error fetching country information:", error);
        }
    };


    function handleClear() {
        setFormData({
            name: "",
            description: "",
        })
        setContinentId("")
    }

    return (
        <PageContainer>
            <form onSubmit={handleSubmit} className=' min-w-[400px] max-w-[600px] m-auto my-20 min-h-[40vh]'>
                <h1 className='text-2xl font-bold mb-4'>Add Country</h1>
                <div className='flex flex-col gap-4'>
                    <TextField variant='outlined' type="text" label='Name' name="name" value={formData.name} onChange={handleChange} />
                    <TextField variant='outlined' type="text" label='Description' multiline name="description" value={formData.description} onChange={handleChange} />

                    <Select value={continentId} onChange={(e) => setContinentId(e.target.value)}>
                        {continents?.map((continent) => (
                            <MenuItem key={continent?.id} value={continent?.id}>
                                {continent?.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className='flex gap-4'>
                        <Button variant="contained" color="primary" disabled={loading} className=' bg-blue-500 hover:bg-blue-600' type="submit">
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                        <Button variant="contained" color="error" className=' bg-red-500 hover:bg-red-600' onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </div>
            </form>
        </PageContainer>
    )
}

export default AddwithUpdatepage