import nodeFetch from 'node-fetch'

export default async function handler(req, res) {
  const lat = req.body.midpoint.lat
  const lng = req.body.midpoint.lng
  const category = req.body.category
  const radius = req.body.radius
  console.log(category);

  const response = await nodeFetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${category}&key=AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk`);

  const jsonResponse = await response.json()

  res.status(200).json(jsonResponse)
}