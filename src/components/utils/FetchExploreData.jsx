import axios from "axios"

export default async function FetchExploreData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    console.log(data)
    return data
}