import { useState, useEffect } from "react"

const useFetch = (endpoint) => {
    const [isPending, setIsPending] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abort = new AbortController();


        setTimeout(() =>
            fetch(endpoint, {signal: abort.signal})
            .then(res => {
                if (res.status !== 200) throw Error('Unexpected response status: ' + res.status)
                return res.json()
            })
            .then(data => {
                setData(data)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setError(err.message)
                }
            })
            .finally(() => {
                setIsPending(false)
            })
        , 1000)
    
        return () => abort.abort()
    }, [endpoint])

    return {data, isPending, error}
}

export default useFetch;