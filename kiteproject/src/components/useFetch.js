import {useEffect, useState} from 'react'



const useFetch = (url) => {
    const[data, setData]=useState([]);
    const[isPending, setIsPending]=useState(true);
    const[error,setError]=useState(null);
    const[initialData,setInitialData]=useState(null);
    

    useEffect(() => {
        setTimeout(() => {
            console.log('am intrat in useeffect')
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(data=>{
                    setData(data);
                    setInitialData(data)
                    setIsPending(false);
                    setError(null);
                })
                .catch(err=>{
                    setIsPending(false);
                    setError(err.message)
                })
                
        }, 1000);
        
    }, [url])
    
    

    return {data,initialData,isPending,error,setData,}
}

export default useFetch