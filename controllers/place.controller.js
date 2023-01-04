const { Place, UserPlace } = require("./../models");

exports.create = async (req, res) => {
  try {
    const newPlace = new Place({
      ...req.body,
      creator: req.user._id,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Place.find({}).populate("creator").sort("-createdAt");
    for (const place of list) {
      const userVisitLast24h = await UserPlace.find({
        place: place._id,
        createdAt: {
          $gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      });
      place._doc.userVisitLast24h = userVisitLast24h;
    }
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { placeId } = req.params.placeId;
    const place = await Place.findById(placeId).populate("creator");
    const userVisitLast24h = await UserPlace.find({
      place: place._id,
      createdAt: {
        $gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    }).populate("user");
    place._doc.userVisitLast24h = userVisitLast24h;
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { placeId } = req.params.placeId;
    const place = await Place.findOneAndUpdate(
      {
        _id: placeId,
        creator: req.user._id,
      },
      {
        $set: req.body,
      }
    );
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { placeId } = req.params.placeId;
    await UserPlace.deleteMany({ place: placeId });
    await Place.findOneAndDelete({
      _id: placeId,
      creator: req.user._id,
    });
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
