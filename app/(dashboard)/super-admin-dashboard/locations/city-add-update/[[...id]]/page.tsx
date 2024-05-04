'use client'

import PageContainer from '@/components/ui/pageContainer'
import { getDivisions } from '@/service/query/divisionQuery'
import React, { useEffect, useState } from 'react'

const CityCreateUpdatePage = () => {
    const [divisions, setDivisions] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchDivisions() {
            const response = await getDivisions()
            setDivisions(response?.data)
        }
        fetchDivisions()
    })

    return (
        <PageContainer>CityCreateUpdatePage</PageContainer>
    )
}

export default CityCreateUpdatePage