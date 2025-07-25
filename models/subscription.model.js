import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'subscription price is required'],
        trim: true,
        min: [0, 'price must be greater than 0'],
        max: [1000, 'Price must be less than 1000'],
    },
    currency: {
        type: String,
        required: [true, 'currency is required'],
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        required: [true, 'subscription name is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertaiment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'exprired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },


            message: 'Renwal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, { timestamps: true });
// {timestamps: true}will automatically add create and updateAt field to the schema;

// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function (next) {
    console.log("renew", this.renewalDate)

    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        // Jan  1st
        // monthly
        //  30days
        // Jan

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
        console.log("renew 2", this.renewalDate)

    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subcription = mongoose.model('Subscription', subscriptionSchema);

export default Subcription;




// {timestamps: true}will automatically add create and updateAt field to the schema;

