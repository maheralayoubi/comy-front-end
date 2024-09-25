import React, { useEffect, useState } from "react"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"
import BusinessSheetTemplate from "../components/BusinessSheetTemplate"
import { getBusinessSheet } from "../api/businessSheet"

const Profile = () => {
    const [businessSheetData, setBusinessSheetData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await getBusinessSheet()
            setBusinessSheetData(response.data)
            console.log(response.data)
        }
        getData()
    }, [])

    return (
        <div>
            <Header />
            <BusinessSheetTemplate data={businessSheetData} isEdit={true} />
            <Footer />
        </div>
    )
}

export default Profile
