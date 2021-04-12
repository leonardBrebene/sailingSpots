 const deleteObject= async(restoflink, id)=> {
     await fetch(`https://606cae1c603ded0017502834.mockapi.io/${restoflink}/${id}`,{
         method:'DELETE'})
     .then (console.log('lam sters pe cel de la id',id))
}
export default deleteObject
