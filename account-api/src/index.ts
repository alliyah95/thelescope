require("dotenv").config({ path: "../.env" });
import "dotenv/config";
import { auth, db } from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { ClinicMember, Collections } from "./utils/types";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is up");
});

app.post("/register", async (req: Request, res: Response) => {
    const reqBody: ClinicMember = req.body;
    const {
        name,
        email,
        isAdmin,
        clinicId,
        clinicName,
        password,
        permissions,
    } = reqBody;

    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const clinicRef = doc(db, Collections.Clinic, `${clinicId}`);
        const membersRef = collection(clinicRef, Collections.ClinicMembers);
        const newMemberData = {
            userId: user.user?.uid,
            name,
            email,
            isAdmin,
            clinicId,
            clinicName,
            permissions,
        };
        await addDoc(membersRef, newMemberData);

        const usersRef = collection(db, Collections.ThelescopeUsers);
        await addDoc(usersRef, newMemberData);

        res.status(201).json({ message: "Account created successfully" });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server started at port 3000.");
});
