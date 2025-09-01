import { z } from "zod"

export const signupSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    dateOfBirth: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date || date === "") return true;

        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(date)) return false;

        const [day, month, year] = date.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);

        // Validate that parsed date components match exactly
        return (
          !isNaN(parsedDate.getTime()) &&
          parsedDate.getDate() === day &&
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getFullYear() === year
        );
      },
      { message: "Invalid date format. Use 'DD-MM-YYYY'." }
    ),
})