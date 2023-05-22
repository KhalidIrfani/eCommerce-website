
const sendToken = (user, statusCode, resp) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    resp.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;