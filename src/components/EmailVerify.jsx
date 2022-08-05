import { Alert, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import refreshToken from "../api/post/refreshToken";
import verifyEmail from "../api/post/verifyEmail";

const EmailVerify = () => {
    const user = useSelector((state) => state.user);
    const lang = useSelector((state) => state.lang);
    const {token} = useParams()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const verify =  async (retry) => {
        try {
            await verifyEmail(token);
        } catch (error) {
            if (retry) {
                try {
                    await refreshToken();
                    await verify(false);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setError(lang === 'gr' ? 'Κατι πηγε λαθος. Προσπαθηστε ξανα αργοτερα' : 'Something went bad. Try again later')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => void verify(true),[])

    useEffect(() => {
        if (!user) window.location.href = "/login";
    }, [user]);

    return <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Alert color={loading ? 'info' : error ? "error" : 'success'}>
            {loading ? 'Loading...' : error ? error : lang === 'gr' ? 'Το μειλ σας επιβεβαιωθηκε' : 'Your email have been verified'}
        </Alert>
    </Box>
}

export default EmailVerify
