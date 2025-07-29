import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useMutation } from "@tanstack/react-query";
import { sdk } from "../lib/config";
import { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types";
import { Select } from "@medusajs/ui";

const STATUS_OPTIONS = [
  { label: "Recibido", value: "recibido" },
  { label: "En preparación", value: "en_preparacion" },
  { label: "Enviado", value: "enviado" },
  { label: "Finalizado", value: "finalizado" },
];

const OrderCustomerStatusWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const { id } = data;

  const { data: _dataUpdated, mutate } = useMutation({
    mutationFn: (status: string) =>
      sdk.admin.order.update(id!, {
        metadata: {
          ...data?.metadata,
          customer_status: status,
        },
      }),
    mutationKey: ["products", id, "updateStatus"],
  });

  const current = (data.metadata?.customer_status as string) ?? "recibido";

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-base font-medium">Estado del Pedido</h3>
      <Select value={current} onValueChange={(value) => mutate(value)}>
        <Select.Trigger>
          <Select.Value placeholder="Placeholder" />
        </Select.Trigger>
        <Select.Content>
          {STATUS_OPTIONS.map((opt) => (
            <Select.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "order.details.before",
});

export default OrderCustomerStatusWidget;
