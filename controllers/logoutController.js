const User = require('../model/User');


const handleLogout = async (req, res) => {
    //! On client, also delete the accessToken in the memory in the client application
    
    //^ what we will do here is delete the refresh token from the cookie and the db
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    //? Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //* we didnt find a user but we have a cookie so just delete it
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

    //? Delete refreshToken in db
                            //! foundUser.refreshToken.filter(rt => rt !== refreshToken);
    foundUser.refreshToken = [];
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
    
    
}

module.exports = { handleLogout }
