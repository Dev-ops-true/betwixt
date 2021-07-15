import nodeFetch from 'node-fetch'

export default async function handler(req, res) {
  // const { lat, long } = req.body
  const response = await nodeFetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk`)
  const jsonResponse = await response.json()

  res.status(200).json(jsonResponse)
}