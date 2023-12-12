import axios from 'axios'


export default async function FetchAuthorData(authorId) {
    const { data } = await axios.get(` https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    return data
}