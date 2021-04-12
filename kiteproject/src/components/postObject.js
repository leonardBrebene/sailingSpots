
const postObject = async (restoflink, item) => {
    item={...item,id: Math.floor(Math.random() * 9999)}
    await fetch(`https://606cae1c603ded0017502834.mockapi.io/${restoflink}`, {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(item)
    })
        .then(console.log('am postat obiectu', JSON.stringify(item)))
}
export default postObject;