// import { NextResponse } from "next/server";

// import ctrl from "../../controllers/sending-groups"

// get all groups for one user by user ID
// export async function GET(request: Request) {
// 	console.log('GET');
// 	console.log(ctrl.createGroup)
// ctrl.getUserGroupes(request);
// }

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
// export async function POST(request: Request) {
// 	try {
// 		console.log('POST');
// 		const response = ctrl.createGroup(request);
// 		console.log('response:', response)
// 		return NextResponse.json(
// 			{ message: "New group created successfully" },
// 			{ status: 201 });
// 	} catch (error) {
// 		return NextResponse.json("Failed to create a new group", { status: 500 });
// 	}

// }
