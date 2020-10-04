var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', (err, payload) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        const { userId } = payload;
        const user = yield User.findById(userId);
        req.user = user;
        next();
    }));
};
//# sourceMappingURL=requireAuth.js.map