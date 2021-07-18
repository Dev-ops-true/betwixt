import nodeFetch from 'node-fetch'

export default async function handler(req, res) {
  const lat = req.body.lat
  const lng = req.body.lng

  const response = await Promise.all([
    nodeFetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk`),
    nodeFetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=bar&key=AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk`),
    nodeFetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk`)
  ]);

  const jsonResponse = await Promise.all(response.map(r => r.json()))

  const jsonObject = { restaurants: jsonResponse[0], bars: jsonResponse[1], cafes: jsonResponse[2] }
  res.status(200).json(jsonObject)
  console.log(jsonResponse)
}