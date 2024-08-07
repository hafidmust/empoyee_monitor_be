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
/**
 * get all tasks
 */
export const getTasks = async (req, res) => {
    try{
        const tasks = await prisma.task.findMany({
            select: {
                id: true,
                description: true,
                dueDate: true,
                assignedBy: {
                    select: {
                        username: true
                    }
                },
                assignedTo: {
                    select: {
                        username: true
                    }
                }
            }
        });
        res.status(200).json({  
            message: 'success',
            responseData: tasks
        });
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}
/**
 * get list task by user
 */

export const getTasksAssigned = async (req, res) => {
    try{
        const tasks = await prisma.task.findMany({
            where: {
                assignedToId: req.user.id
            },
            select: {
                id: true,
                description: true,
                dueDate: true,
                assignedBy: {
                    select: {
                        username: true
                    }
                },
                assignedTo: {
                    select: {
                        username: true
                    }
                }
            }
        });
        res.status(200).json({  
            message: 'success',
            responseData: tasks
        });
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

