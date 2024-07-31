import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { dbConnection } from "../../../db/db"
import Task from "../../_models/TaskSchema";


export async function DELETE(req: NextRequest, { params }: { params: { id: String } }) {
    try {
        await dbConnection();
        const deletedTask = await Task.findByIdAndDelete(params.id);
        console.log(deletedTask)


        if (!deletedTask) {
            return NextResponse.json({ error: "Task not found", status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Task deleted successfully',
            deletedTask
        });
    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}

// export async function PUT(req: NextRequest, { params }: { params: { id: String } }) {
//     try {
//         await dbConnection();
//         const { title, description, completed } = await req.json();
//         const updatedTask = await Task.findByIdAndUpdate(
//             params.id,
//             { title, description, completed },
//             { new: true, runValidators: true }
//         );
//         console.log(updatedTask);

//         if (!updatedTask) {
//             return NextResponse.json({ error: "Task not found", status: 404 });
//         }

//         return NextResponse.json({
//             success: true,
//             message: 'Task updated successfully',
//             updatedTask
//         });
//     } catch (error) {
//         console.log("ERROR UPDATING TASK: ", error);
//         return NextResponse.json({ error: "Error updating task", status: 500 });
//     }
// }