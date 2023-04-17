//Packages
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

const useLoginProviders = () => {
    const loginProvider = (data: any) => {
        const request = axios({
            method: 'POST',
            url: `login`,
            data,
        })

        return trackPromise(request)
    }

    return { loginProvider }
}

export default useLoginProviders
