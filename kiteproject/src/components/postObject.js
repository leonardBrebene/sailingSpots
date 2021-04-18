
const postObject = async (restoflink, item) => {
    //const[response,setResponse]=useState()
    item={...item,id: Math.floor(Math.random() * 9999)}
   const res= await fetch(`https://606cae1c603ded0017502834.mockapi.io/${restoflink}`, {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(item)
    })
    const dates = await res.json();
    return dates
}
export default postObject;