const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
      title: {
        type: String,
        lowercase: true,
        required: true
      },
      music: {
        type: Object,
        required: true,
      },
      artist: {
        type: String,
        lowercase: true,
        required: true
      },
    },

    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("music", schema);