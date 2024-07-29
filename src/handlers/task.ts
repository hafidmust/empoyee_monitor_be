import prisma from "../db"
export const createTask = async (req, res) => {
    try{
        const assignedById = req.user.id;
        const {description, dueDate, assignedToId} = req.body;
        const task = await prisma.task.create({
            data: {
                description: description,
                dueDate: new Date(dueDate),
                assignedById: assignedById,
                assignedToId: assignedToId,
            }
        });
        res.status(201).json(task);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}