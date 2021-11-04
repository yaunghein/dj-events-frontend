const { events } = require('./eventsData.json')

export default (req, res) => {
  if ((req.method = 'GET')) {
    res.status(200).json(events)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `${req.method} Method is not allowed.` })
  }
}
