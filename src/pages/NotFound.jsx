import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/")
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center text-2xl font-semibold'>
            <h3>Page you're looking for doesn't exist</h3>
        </div>
    )
}

export default NotFound