const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email().min(3).max(100),
  password: z.string().min(3).max(100),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
});

const loginSchema = z.object({
  email: z.string().email().min(3).max(100),
  password: z.string().min(3).max(100),
});

module.exports = {
  registerSchema,
  loginSchema,
};
