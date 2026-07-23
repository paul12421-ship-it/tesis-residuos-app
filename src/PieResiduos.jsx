import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colores = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#9C27B0",
  "#FF5722",
  "#9E9E9E",
];

export default function PieResiduos({ registro }) {

 const data = [
  { name: "Orgánicos", value: Number(registro.organicos) },
  { name: "Plásticos", value: Number(registro.plasticos) },
  { name: "Papel", value: Number(registro.papel) },
  { name: "Vidrio", value: Number(registro.vidrio) },
  { name: "Metales", value: Number(registro.metales) },
  { name: "Otros", value: Number(registro.otros) },
];

  return (
    <div className="composicion-card">

      <h4 className="titulo-ficha">
        ♻️ Composición de residuos
      </h4>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colores[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="leyenda-residuos">

  <div><span className="color color-organicos"></span> Orgánicos </div>

  <div><span className="color color-plasticos"></span> Plásticos</div>

  <div><span className="color color-papel"></span> Papel </div>

  <div><span className="color color-vidrio"></span> Vidrio </div>

  <div><span className="color color-metales"></span> Metales </div>

  <div><span className="color color-otros"></span> Otros </div>

</div>

    </div>
  );
}