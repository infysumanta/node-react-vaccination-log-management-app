const jwt = require("jsonwebtoken");
const { User, UserVaccine, UserPlace } = require("./../models");
const config = require("./../config");

exports.create = async (req, res) => {
  const { phoneNumber, idNumber } = req.body;
  try {
    const isPhoneExist = await User.findOne({ phoneNumber: phoneNumber });
    if (isPhoneExist) {
      return res
        .status(403)
        .send("Phone Number already registered for another account");
    }
    const isIdNumberExist = await User.findOne({ idNumber: idNumber });
    if (isIdNumberExist) {
      return res
        .status(403)
        .send("Id Number already registered for another account");
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.JWT_TOKEN, {
      expiresIn: "30d",
    });

    res.status(201).json({
      user: savedUser,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await User.find({}).sort("-createdAt");
    for (const user of list) {
      const vaccine = await UserVaccine.find({
        user: user._id,
      }).sort("-createdAt");
      user._doc.vaccine = vaccine;
    }
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userVaccine = await UserVaccine.find({
      user: req.params.userId,
    })
      .populate("vaccine")
      .populate("vaccineLot")
      .sort("-createdAt");
    const userPlaceVisit = await UserPlace.find({
      user: req.params.userId,
    })
      .populate("place")
      .sort("-createdAt");
    user._doc.vaccinated = userVaccine;
    user._doc.placeVisited = userPlaceVisit;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  const { phoneNumber, idNumber } = req.body;
  const userId = req.params.userId;
  try {
    const isPhoneExist = await User.findOne({ phoneNumber: phoneNumber });
    if (isPhoneExist && isPhoneExist._id.toString() !== userId) {
      return res
        .status(403)
        .send("Phone Number already registered for another account");
    }
    const isIdNumberExist = await User.findOne({ idNumber: idNumber });
    if (isIdNumberExist && isPhoneExist._id.toString() !== userId) {
      return res
        .status(403)
        .send("Id Number already registered for another account");
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      $set: req.body,
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserVaccine.deleteMany({ user: userId });
    await UserPlace.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.status(200).send("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
