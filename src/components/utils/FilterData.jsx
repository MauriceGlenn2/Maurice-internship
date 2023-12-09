import axios from "axios"

export default async function FilterData(value) {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    return data
}
