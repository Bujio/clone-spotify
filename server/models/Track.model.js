const {Schema, model} = require('mongoose')

const trackSchema = new Schema(
  {
    trackName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    artists:
  }
)