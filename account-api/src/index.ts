require("dotenv").config({ path: "../.env" });
import "dotenv/config";
import { auth, db } from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { ClinicMember, Collections } from "./utils/types";

const app = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is up");
});

app.post("/register", async (req: Request, res: Response) => {
    console.log(req.body);
    const reqBody: ClinicMember = req.body;
    const {
        userId,
        name,
        email,
        isAdmin,
        clinicId,
        clinicName,
        password,
        permissions,
    } = reqBody;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        const clinicRef = doc(db, Collections.Clinic, `${clinicId}`);
        const membersRef = collection(clinicRef, Collections.ClinicMembers);
        const newMemberData = {
            userId,
            name,
            email,
            isAdmin,
            clinicId,
            clinicName,
            permissions,
        };
        await addDoc(membersRef, newMemberData);
        res.status(201).json({ message: "Account created successfully" });
    } catch (err: any) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server started at port 3000.");
});
