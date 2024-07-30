import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { dbConnection } from "../../db/db.js"
import Task from "../_models/TaskSchema";

export async function POST(req: NextRequest) {

    // try {
    //     const { userId } = getAuth(req);

    //     if (!userId) {
    //         return NextResponse.json({ error: "Unauthorized", status: 401 });
    //     }


    //     const tasks = await prisma.task.findMany({

    //         where: {
    //             userId,
    //         },
    //     });

    //     console.log(userId);
    //     console.log("TASKS:", tasks);
    //     return NextResponse.json(tasks);
    // } catch (error) {
    //     console.log("ERROR CREATING TASK: ", error);
    //     return NextResponse.json({ error: "Error creating task", status: 500 });
    // }
    try {
        // const { userId } = getAuth(req);

        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized", status: 401 });
        // }
        // console.log(userId);
        await dbConnection();
        const body = await req.json();

        console.log(body);

        const newtask = new Task({ ...body });

        await newtask.save();
        console.log(newtask);


        return NextResponse.json({
            success: true,
            message: 'Question added successfully'
        });


    } catch (error) {
        console.log(error);
    }
}

// export async function GET(req: NextRequest) {
//     try {
//         const { userId } = getAuth(req);

//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized", status: 401 });
//         }

//         const tasks = await prisma.task.findMany({

//             where: {
//                 userId,
//             },
//         });

//         return NextResponse.json(tasks);
//     } catch (error) {
//         console.log("ERROR GETTING TASKS: ", error);
//         return NextResponse.json({ error: "Error getting tasks", status: 500 });
//     }
// }

// export async function PUT(req: NextRequest) {
//     try {
//         const { userId } = getAuth(req);
//         const { taskId, data } = await req.json();

//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized", status: 401 });
//         }

//         const updatedTask = await prisma.task.update({
//             where: {
//                 id: taskId,
//                 userId,
//             },
//             data,
//         });

//         return NextResponse.json(updatedTask);
//     } catch (error) {
//         console.log("ERROR UPDATING TASK: ", error);
//         return NextResponse.json({ error: "Error updating task", status: 500 });
//     }
// }

// export async function DELETE(req: NextRequest) {
//     try {
//         const { userId } = getAuth(req);
//         const { taskId } = await req.json();

//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized", status: 401 });
//         }

//         await prisma.task.delete({
//             where: {
//                 id: taskId,
//                 userId,
//             },
//         });

//         return NextResponse.json({ message: "Task deleted successfully" });
//     } catch (error) {
//         console.log("ERROR DELETING TASK: ", error);
//         return NextResponse.json({ error: "Error deleting task", status: 500 });
//     }
// }