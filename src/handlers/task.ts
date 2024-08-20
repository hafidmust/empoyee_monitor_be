import { report } from "process";
import prisma from "../db"


export const createTask = async (req, res) => {
    try{
        const date = new Date(req.body.dueDate);
        date.setDate(date.getDate() + 1);

        // Convert the date to locale ID string format
        const formattedDate = date.toLocaleDateString('id-ID');

        // Parse the formatted date string back to a Date object
        const [day, month, year] = formattedDate.split('/');
        const localeDate = new Date(`${year}-${month}-${day}`);

        const assignedById = req.user.id;
        const {description, assignedToId} = req.body;
        const task = await prisma.task.create({
            data: {
                description: description,
                dueDate: new Date(localeDate),
                assignedById: assignedById,
                assignedToId: assignedToId,
            },
            select: {
                id: true,
                description: true,
                dueDate: true,
                assignedBy: {
                    select: {
                        username: true,
                        fullName: true
                    }
                },
                assignedTo: {
                    select: {
                        username: true,
                        fullName: true
                    }
                }
            }
        });
        console.log('task', task);
        res.status(201).json({
            message: 'success',
            responseData: task
        });
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

