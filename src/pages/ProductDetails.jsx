import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../utils/axios"

const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState({})
    const { id } = useParams()

    const getProductDetails = async () => {
        try {
            const { data, statusText } = await api.get(`https://ilkinibadov.com/api/v1/products/${id}/details`)
            if (statusText === "OK") {
                setProductDetails(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProductDetails()
    }, [id])

    return (
        <div className='w-full h-screen flex justify-center items-center'>{productDetails.title}</div>
    )
}

export default ProductDetails