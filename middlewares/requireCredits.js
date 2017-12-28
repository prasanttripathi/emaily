module.exports = (req, res, next) => {
	if (req.user.credit<1) {
		return res.status(403).send({ error: 'you dont have enough credit' });
	}

	next();
};
