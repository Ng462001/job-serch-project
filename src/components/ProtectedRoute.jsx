import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ Component }) => {

    const token = Cookies.get("jwt-token")
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            {token ?
                <Component />
                :
                <></>
            }
        </>
    )
}

export default ProtectedRoute