import React, { useEffect, useState } from "react"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"
import BusinessSheetTemplate from "../components/BusinessSheetTemplate"
import { getBusinessSheet, editBusinessSheet } from "../api/businessSheet"
import { SpinnerPage } from "../components/global/Spinner"
import useLocalStorage from "../hooks/useLocalStorage"

const Profile = () => {
    const [businessSheetData, setBusinessSheetData] = useState(null)
    const { getValue, setValue, clearAll } = useLocalStorage()

    useEffect(() => {
        console.log("get sheet")
        clearAll()
        const getData = async () => {
            const response = await getBusinessSheet()
            setValue("businessSheetData", response.data)
            setBusinessSheetData(getValue("businessSheetData"))
        }
        getData()
    }, [getValue, setValue, clearAll])

    const handleEdit = async (updatedData) => {
        console.log("update")
        await editBusinessSheet(updatedData)
        // setBusinessSheetData(null)
        // const response = await getBusinessSheet()
        const updatedBusinessSheetData = {
            ...businessSheetData,
            ...updatedData,
        }
        setValue("businessSheetData", updatedBusinessSheetData)
        setBusinessSheetData(getValue("businessSheetData"))
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
