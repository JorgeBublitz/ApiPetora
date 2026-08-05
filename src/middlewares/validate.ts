import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

/**
 * Middleware genérico de validação Zod.
 * Valida `req.body` ou `req.params` e substitui o valor validado na requisição.
 *
 * @example router.post("/", validate(createPetSchema), controller.create);
 * @example router.get("/:id", validate(idParamSchema, "params"), controller.getById);
 */
export function validate(schema: ZodType, source: "body" | "params" = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(result.error);
    }

    if (source === "params") {
      req.params = result.data as unknown as Request["params"];
    } else {
      req.body = result.data;
    }

    next();
  };
}
