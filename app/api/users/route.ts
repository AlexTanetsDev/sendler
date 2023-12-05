import { NextResponse } from "next/server";
import db from "@/db";
import { hash } from "bcrypt";
import { schemaCreateNewUser } from "@/models/users";

