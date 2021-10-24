const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateLoginInput, validateRegisterInput } = require('../../Util/validator');
const checkAuth = require('../../Util/check_auth');
const { SECRET_KEY } = require('../../Config/config');
const User = require('../../Models/Users');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            cellphone: user.cellphone,
            username: user.username
        },
        SECRET_KEY,
        {
            expiresIn: '1h'
        }
    );
}

module.exports = {

    Query: {

        async getUsers() {

            try {
                
                const users = await User.find();

                return users;

            } catch (err) {
                
                throw new Error(err);

            }

        },

        async getUser(_, { userId }) {

            try {
                
                const user = await User.findById(userId);

                return user;

            } catch (err) {
                
                throw new Error(err);

            }

        }

    },

    Mutation: {

        async login(_, { email, password }) {
            
            const { errors, valid } = validateLoginInput(email, password);

            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if(!user) {

                errors.general = "User not found";
                throw new UserInputError('User not found', { errors })

            }

            const match = await bcrypt.compare(password, user.password);

            if(!match) {

                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });

            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }

        },

        async registerUser(_, { 
            name, 
            lastname, 
            username, 
            cellphone, 
            email, 
            rol, 
            password, 
            confirmPassword 
        }) {

            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

            if(!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const user = await User.findOne({ email });

            if(user) {
                throw new UserInputError('email is taken', {
                    errors: {
                        email: 'This email is taken'
                    }
                })
            }

            const newUser = new User({
                name,
                lastname,
                username,
                cellphone,
                email,
                rol,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }

        },

        async updateUser(_, { userId, name, lastname, email }) {

            try {
                
                const user = await User.findById(userId);

                if(!user) {

                    throw new Error('User not found')

                }

                const updateUser = await User.findByIdAndUpdate(userId, {
                    name,
                    lastname,
                    email
                });

                return updateUser;

            } catch (err) {
                
                throw new Error(err);

            }

        },

        async deleteUser(_, { userId }) {

            try {
                
                const user = await User.findById(userId);

                if(!user) {

                    throw new Error('User not found');

                }

                await User.findByIdAndDelete(userId);
                
                return 'User has been deleted :D';

            } catch (err) {
                
                throw new Error(err);

            }

        }

    }

}