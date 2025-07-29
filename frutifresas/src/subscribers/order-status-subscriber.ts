import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/framework";
import {
  updateOrderWorkflow,
} from "@medusajs/medusa/core-flows";
import { ADMIN_USER_ID } from "../helpers/constants";

export default async function setCustomStatusOnOrderPlaced({
  event: { data }, // Payload del evento order.placed contiene la id de la orden
  container,
}: SubscriberArgs<{ id: string }>) {
  const { result } = await updateOrderWorkflow(container).run({
    input: {
      id: data.id,
      user_id: ADMIN_USER_ID,
      metadata: { customer_status: "recibido" },
    },
  });
  console.log("Ejecutando workflow updateOrderWorkflow con input:");
  console.log(result);
}

export const config: SubscriberConfig = {
  event: `order.placed`,
};
