import useFetch from "../useFetch"

const LocationDetails = () => {
    const { data, isPending, error } = useFetch('https://606cae1c603ded0017502834.mockapi.io/spot');
    return (
        <div className="locationDetails">
            {error && <div>{error}</div>}
            {isPending && <div>Loading..</div>}
            {data}

        </div>
    );
}
export default LocationDetails