import React, { useEffect, useState } from "react"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"
import BusinessSheetTemplate from "../components/BusinessSheetTemplate"
import { getBusinessSheet, editBusinessSheet } from "../api/businessSheet"

const Profile = () => {
    const [businessSheetData, setBusinessSheetData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await getBusinessSheet()
            setBusinessSheetData(response.data)
            // console.log(
            //     `${response.data.profileImageUrl}?timestamp=${new Date().getTime()}`
            // )
        }
        getData()
    }, [])

    const handleEdit = async (updatedData) => {
        setBusinessSheetData(null)
        console.log("update")
        await editBusinessSheet(updatedData)
        console.log(updatedData)
        const response = await getBusinessSheet()
        setBusinessSheetData(response.data)
        // console.log(
        //     `${response.data.profileImageUrl}?timestamp=${new Date().getTime()}`
        // )
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
                <span>loading ...</span>
            )}
            <Footer />
        </div>
    )
}

export default Profile
