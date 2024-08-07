import { PrismaClient } from "@prisma/client";
import express from 'express';
import { getStaff, signin, signup } from "./handlers/user";
import { upload } from "./handlers/upload";
import { protect } from "./modules/auth";
import router from "./router";
require('dotenv').config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.EXPRESS_PORT || 8080;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Management API",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/handlers/*.ts"],
}
const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function main() {
    const getAllUsers = await prisma.user.findMany();
    console.log(getAllUsers);
}

app.use('/api/v1', protect, router);

app.post('/signin',signin);
app.post('/signup', signup);
app.get('/getStaff', getStaff);
app.use((err, req, res, next) => {
    console.log(err)
    res.json({message: `had an error: ${err.message}`})
  })
// main()
// .catch(e => {})
// .finally(async () => await prisma.$disconnect());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});