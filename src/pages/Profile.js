import React, { useEffect, useState } from "react"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"
import BusinessSheetTemplate from "../components/BusinessSheetTemplate"
import { getBusinessSheet, editBusinessSheet } from "../api/businessSheet"
import { SpinnerPage } from "../components/global/Spinner"

const Profile = () => {
    const [businessSheetData, setBusinessSheetData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await getBusinessSheet()
            setBusinessSheetData(response.data)
        }
        getData()
    }, [])

    const handleEdit = async (updatedData) => {
        console.log("update")
        await editBusinessSheet(updatedData)
        setBusinessSheetData(null)
        const response = await getBusinessSheet()
        setBusinessSheetData(response.data)
    }

    return (
        <div>
            <Header />
            {businessSheetData ? (
                <BusinessSheetTemplate
                    data={businessSheetData}
                    isEdit={true}
                    handleEdit={handleEdit}
                />
            ) : (
                <SpinnerPage />
            )}
            <Footer />
        </div>
    )
}

export default Profile
