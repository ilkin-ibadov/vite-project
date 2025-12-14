import Card from "../components/Card"
import { useState, useEffect } from "react"
import { useDarkmode } from "../stores/darkmodeStore"
import api from "../utils/axios"
import { useTranslation } from "react-i18next"
import LanguageSelector from "../components/LanguageSelector"

const Products = () => {
    const { t } = useTranslation()
    const { isDarkmodeActive, toggleDarkmode } = useDarkmode()
    const [searchterm, setSearchterm] = useState("")
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const { data, statusText } = await api.get(searchterm.length >= 3 ? `${process.env.API_URL}/search?searchterm=${searchterm}` : "https://ilkinibadov.com/api/v1/products")
            console.log(data)
            if (statusText === "OK") {
                setProducts(searchterm.length >= 3 ? data.content : data.products)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [searchterm])

    return (
        <div className={`${isDarkmodeActive ? "bg-slate-900 text-white" : "bg-white text-black"} transition-all duration-200`}>
            <h1 className="m-5 sm:text-lg md:text-xl lg:text-2xl text-red-600">{t("loginTitle")}</h1>
            <div className="w-full flex justify-center py-5">
                <input className={`border border-zinc-300 p-3 min-w-[300px]`} placeholder="Search for any product.." type="text" value={searchterm} onChange={(e) => {
                    setSearchterm(e.target.value)
                }} />
                <button onClick={toggleDarkmode} className="bg-red-600 text-white px-2 hover:cursor-pointer hover:bg-red-700">{isDarkmodeActive ? t('disable') : t('enable')} Darkmode</button>
                <LanguageSelector />
            </div>
            <div className="w-full min-h-screen h-fit grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
                {products.map(product => <Card key={product._id} product={product} />)}
            </div>
        </div>
    )
}

export default Products