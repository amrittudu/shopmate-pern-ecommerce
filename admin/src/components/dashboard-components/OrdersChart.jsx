import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const OrdersChart = () => {
  const { orderStatusCounts } = useSelector((state) => state.admin);

  const statusColors = {
    Processing: "#facc15", // yellow
    Shipped: "#3b82f6", // blue
    Delivered: "#22c55e", // green
    Cancelled: "#ef4444", // red
  };

  const renderLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 35;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  const orderStatusData = Object.keys(orderStatusCounts).map((status) => ({
    status,
    count: Number(orderStatusCounts[status]),
  }));

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-semibold mb-2">Order Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="count"
              nameKey="status"
              outerRadius={80}
              label= {renderLabel}
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColors[entry.status] || "#ccc"} // fallback color
                  
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default OrdersChart;
