const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin, User, Place, VaccineLot, UserVaccine } = require("./../models");
const config = require("./../config");

exports.helloAdmin = (req, res) => {
  res.send("Hello Admin");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username: username }).select(
      "+password"
    );
    if (!admin) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password",
          },
        ],
      });
    }

    const checkPassword = await bcrypt.compare(admin.password, password);
    if (checkPassword) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password",
          },
        ],
      });
    }

    admin.password = undefined;

    const token = jwt.sign({ id: admin._id }, config.JWT_TOKEN, {
      expiresIn: "24h",
    });

    res.status(200).json({ admin, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// admin dashboard summary data
exports.summary = async (_, res) => {
  try {
    const totalUser = await User.find({}).count();
    const totalPlace = await Place.find({}).count();

    // count user who has been vaccinated
    const userVaccinated = await UserVaccine.aggregate([
      {
        $group: { _id: "$user" },
      },
    ]).count("user");

    // count total vaccine dose
    const totalVaccineDose = await VaccineLot.aggregate([
      {
        $group: {
          _id: null,
          quantity: { $sum: "$quantity" },
        },
      },
    ]);

    // count total used vaccine dose
    const totalVaccineDoseUsed = await VaccineLot.aggregate().group({
      _id: null,
      vaccinated: { $sum: "$vaccinated" },
    });

    // get lates vaccine lot
    const latestVaccineLot = await VaccineLot.find({})
      .sort("-createdAt")
      .limit(4)
      .populate("vaccine");

    // count user who has one vaccine dose
    const userWithOneDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: 1 })
      .count("count");

    // count user who has >= two dose
    const userWithAboveTwoDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: { $gte: 2 } })
      .count("count");

    res.status(200).json({
      totalUser,
      totalPlace,
      userVaccinated: userVaccinated[0] ? userVaccinated[0].user : 0,
      availableVaccineDose:
        (totalVaccineDose[0] ? totalVaccineDose[0].quantity : 0) -
        (totalVaccineDoseUsed[0] ? totalVaccineDoseUsed[0].vaccinated : 0),
      latestVaccineLot,
      userVaccinatedAnalyst: {
        totalUser,
        userWithAboveTwoDose: userWithAboveTwoDose[0]
          ? userWithAboveTwoDose[0].count
          : 0,
        userWithOneDose: userWithOneDose[0] ? userWithOneDose[0].count : 0,
        userWithZeroDose:
          totalUser - (userVaccinated[0] ? userVaccinated[0].user : 0),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
