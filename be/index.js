// index.js
import express, { response } from "express";
import cors from "cors";
import sql from "./config/database.js"; // Ensure this path is correct
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.post("/SignUp", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!firstName || !lastName || !email || !password) {
      return response
        .status(400)
        .send({ success: false, error: "All fields are required" });
    }

    console.log("Request Body:", request.body);

    const hash = await bcrypt.hash(password, 10);
    const id = uuid();

    console.log("Generated Values:", { id, firstName, lastName, email, hash });

    await sql`INSERT INTO customer(customer_id, lastname, firstname, gmail, password) 
              VALUES (${id}, ${lastName}, ${firstName}, ${email}, ${hash})`;

    console.log("User created successfully:", id);
    response.status(201).send({ success: true });
  } catch (error) {
    console.error("Error:", error);
    response
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
});

app.post("/Login", async (request, response) => {
  const { gmail, password } = request.body;
  let jump = false;
  const [user] = await sql`SELECT * FROM customer WHERE gmail = ${gmail}`;
  console.log(user);
  if (!user) {
    return response.status(401).send("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    jump = !jump;
    return response.status(200).send(user);
  } else {
    return response.status(401).send(jump);
  }
});
app.post("/addTask", async (request, response) => {
  const { employeeId, taskName, userId } = request.body;
  const task_id = uuid();
  try {
    console.log(request.body);

    // Insert the new task into the database
    await sql`INSERT INTO task (customer_id, name, employee_id, task_id) 
              VALUES (${userId}, ${taskName}, ${employeeId}, ${task_id})`;

    // Fetch all tasks for the specified user
    const tasks = await sql`SELECT * FROM task WHERE customer_id = ${userId}`;

    // Send the tasks as the response
    response.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ error: "An error occurred while adding the task" });
  }
});
app.get("/addTask", async (request, response) => {
  try {
    const userId = request.query.userId; // Retrieve userId from query parameters
   console.log(userId);
    const tasks = await sql`SELECT * FROM task WHERE customer_id = ${userId}`;
    response.status(200).json(tasks);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "An error occurred while fetching tasks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
