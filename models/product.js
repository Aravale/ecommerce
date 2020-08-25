const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required : true,
        maxlength: 32
    },
    description: {
        type: String,
        required : true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required : true,
        maxlength: 32
    },
    category: {
        type : ObjectId,
        ref: 'category',
        required : true,
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

}, {timestamps: true}
);

/* userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac("sha1",this.salt)
            .update(password)
            .digest("hex");
        }
        catch(err){
            return "";
        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    }
}

//virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password
}) */

module.exports = mongoose.model("Product", productSchema);