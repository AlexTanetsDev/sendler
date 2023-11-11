import db from "@/db";
import { INewDataUser } from "@/globaltypes/types";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY;

export async function userActive(id: string) {
  const userActive = await db.query(
    "SELECT user_active FROM users WHERE user_id = $1",
    [id]
  );
  return userActive.rows[0];
}

export async function AllUserWithFild(
  id: string,
  columnName: keyof INewDataUser,
  user_fild: string,
  newDataUser: INewDataUser
) {
  const allUserColumnName = await db.query(
    `SELECT ${columnName} FROM users WHERE user_id != $1`,
    [id]
  );

  const updateUserColumnName =
    user_fild !== newDataUser[columnName] && user_fild !== ""
      ? user_fild
      : newDataUser[columnName];

  const isUniqueUserFild =
    columnName === "tel"
      ? allUserColumnName.rows.some(
          (user) => user[columnName] === String(updateUserColumnName)
        )
      : allUserColumnName.rows.some((user) => user[columnName] === updateUserColumnName);

  return { isUniqueUserFild, updateUserColumnName };
}

export async function generateToken(userData: { userPassword: string, userEmail: string }): Promise<string> {
  const payload = {
    userPassword: userData.userPassword,
    userEmail: userData.userEmail,
  };

  const key = SECRET_KEY;
  if (key) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, key, { expiresIn: '1h' }, (err, token) => {
        if (err) reject(err);
        resolve(token!); 
      });
    });
  }
  throw new Error('SECRET_KEY is not defined');
  }