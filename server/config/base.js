module.exports = {
    category: require('./category').category,
    score: require('./score').score,

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,

    // Google OAuth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // Facebook OAuth
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,


    // Database 
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_CLUSTER: process.env.DATABASE_CLUSTER,
    DATABASE_NAME: process.env.DATABASE_NAME,
    ADMIN_BRO_EMAIL: process.env.ADMIN_BRO_EMAIL,
    ADMIN_BRO_PASSWORD: process.env.ADMIN_BRO_PASSWORD,
};