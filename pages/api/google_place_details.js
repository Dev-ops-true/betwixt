import nodeFetch from 'node-fetch'

export default async function handler(req, res) {
  const place_id = req.body.place_id

  const response = await nodeFetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_API_KEY}`);

  const jsonResponse = await response.json()

  res.status(200).json(jsonResponse)
  console.log(jsonResponse)
}