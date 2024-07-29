import { PrismaClient } from "@prisma/client";
import express from 'express';
import { signin } from "./handlers/user";
import { upload } from "./handlers/upload";
import { protect } from "./modules/auth";
import router from "./router";
const prisma = new PrismaClient();
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function main() {
    const getAllUsers = await prisma.user.findMany();
    console.log(getAllUsers);
}

app.use('/api/v1', protect, router);

app.post('/signin',signin);

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