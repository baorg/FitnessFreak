const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpressjs = require("@admin-bro/express");
const Resources = require('./AdminBroResources');

const ADMIN = {
    email: 'test@example.com',
    password: 'password',
}

async function setup(app, connection) {
    AdminBro.registerAdapter(AdminBroMongoose);

    const adminBro = new AdminBro({
        rootPath: '/admin',
        databases: [connection],
        resources: Resources,
        branding: {
            companyName: 'FitnessFreak c.o.',
        },
    });

    // const router = AdminBroExpressjs.buildRouter(adminBro);
    const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
        authenticate: async(email, password) => {
            if (ADMIN.password === password && ADMIN.email === email) {
                return ADMIN
            }
            return null
        },
        cookieName: 'adminbro',
        cookiePassword: 'pas9d0uas',
    });

    app.use(adminBro.options.rootPath, router);
}

module.exports = setup;