
import { Router } from "express";

export default (router) => {
  router.post("/store/orders/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orderService = req.scope.resolve("orderService");
    await orderService.update(id, {
      metadata: { custom_status: status }
    });
    res.json({ message: "Estado actualizado" });
  });
  return router;
};
