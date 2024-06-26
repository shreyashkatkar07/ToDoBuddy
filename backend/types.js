const zod = require("zod");

const todoIdDesc = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

const todoId = zod.object({
  _id: zod.string(),
});

module.exports = { todoIdDesc, todoId };
