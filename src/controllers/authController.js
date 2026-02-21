const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Simple check against environment variables
        if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // Create payload
            const payload = {
                user: {
                    role: 'admin'
                }
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};
