import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [distrito, setDistrito] = useState("");
  const [tipoPunto, setTipoPunto] = useState("");
  const [codigoPCRR, setCodigoPCRR] = useState("");
  const [registroExpandido, setRegistroExpandido] = useState(null);

  const [infraestructura, setInfraestructura] = useState("");
  const [estadoInfraestructura, setEstadoInfraestructura] = useState("");
  const [senalizacion, setSenalizacion] = useState("");

  const [organicos, setOrganicos] = useState(0);
  const [plasticos, setPlasticos] = useState(0);
  const [papel, setPapel] = useState(0);
  const [vidrio, setVidrio] = useState(0);
  const [metales, setMetales] = useState(0);
  const [otros, setOtros] = useState(0);

  const [segregacion, setSegregacion] = useState("");
  const [educacion, setEducacion] = useState("");

  const [impactoVisual, setImpactoVisual] = useState("");
  const [olores, setOlores] = useState("");
  const [lixiviados, setLixiviados] = useState("");

  const [observacion, setObservacion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [fotoGeneral, setFotoGeneral] = useState(null);
  const [fotoDetalle, setFotoDetalle] = useState(null);
  const [fotoContexto, setFotoContexto] = useState(null);

  const [registros, setRegistros] = useState(() => {
  const guardados = localStorage.getItem("registros");
  return guardados ? JSON.parse(guardados) : [];
  });
  const [paso, setPaso] = useState(1);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const editarRegistro = (index) => {
  const registro = registros[index];

  setDistrito(registro.distrito);
  setTipoPunto(registro.tipoPunto);

  setInfraestructura(registro.infraestructura);
  setEstadoInfraestructura(registro.estadoInfraestructura);
  setSenalizacion(registro.senalizacion);

  setOrganicos(registro.organicos);
  setPlasticos(registro.plasticos);
  setPapel(registro.papel);
  setVidrio(registro.vidrio);
  setMetales(registro.metales);
  setOtros(registro.otros);

  setSegregacion(registro.segregacion);
  setEducacion(registro.educacion);

  setImpactoVisual(registro.impactoVisual);
  setOlores(registro.olores);
  setLixiviados(registro.lixiviados);

  setObservacion(registro.observacion);

  setLatitud(registro.latitud);
  setLongitud(registro.longitud);

  setFotoGeneral(registro.fotoGeneral);
  setFotoDetalle(registro.fotoDetalle);
  setFotoContexto(registro.fotoContexto);

  setEditandoIndex(index);
  setPaso(1);
};
useEffect(() => {
  localStorage.setItem(
    "registros",
    JSON.stringify(registros)
  );
}, [registros]);
  const total =
    Number(organicos) +
    Number(plasticos) +
    Number(papel) +
    Number(vidrio) +
    Number(metales) +
    Number(otros);
    const totalRegistros = registros.length;
    const totalAlto = registros.filter(
  r => r.potencialValorizacion?.includes("Alto")
).length;

const totalMedio = registros.filter(
  r => r.potencialValorizacion?.includes("Medio")
).length;

const totalBajo = registros.filter(
  r => r.potencialValorizacion?.includes("Bajo")
).length;
let potencialPredominante = "🟢 Alto";

if (totalMedio > totalAlto && totalMedio > totalBajo) {
  potencialPredominante = "🟡 Medio";
}

if (totalBajo > totalAlto && totalBajo > totalMedio) {
  potencialPredominante = "🔴 Bajo";
}
    console.log("Registros:", registros);
console.log("Total:", totalRegistros);
const porcentajeValorizable =
  Number(organicos) +
  Number(plasticos) +
  Number(papel) +
  Number(vidrio) +
  Number(metales);

let potencialValorizacion = "";
let recomendacionValorizacion = "";

if (porcentajeValorizable >= 70) {

  potencialValorizacion = "🟢 Alto";

  recomendacionValorizacion =
    "Predominan residuos valorizables. Se recomienda fortalecer el reciclaje y el compostaje.";

}
else if (porcentajeValorizable >= 40) {

  potencialValorizacion = "🟡 Medio";

  recomendacionValorizacion =
    "Existe potencial de recuperación parcial. Se recomienda mejorar la segregación en origen.";

}
else {

  potencialValorizacion = "🔴 Bajo";

  recomendacionValorizacion =
    "Predominan residuos de difícil valorización. Se recomienda implementar estrategias de separación y educación ambiental.";

}

const totalMercados = registros.filter(
  r => r.tipoPunto === "Mercado"
).length;

const totalParques = registros.filter(
  r => r.tipoPunto === "Parque"
).length;
const tipoPredominante =
  totalMercados >= totalParques
    ? "🏪 Mercado"
    : "🌳 Parque";

const infraestructuraSi = registros.filter(
  r => r.infraestructura === "Sí"
).length;

const infraestructuraNo = registros.filter(
  r => r.infraestructura === "No"
).length;
const porcentajeInfraestructuraSi =
  totalRegistros > 0
    ? ((infraestructuraSi / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeInfraestructuraNo =
  totalRegistros > 0
    ? ((infraestructuraNo / totalRegistros) * 100).toFixed(1)
    : 0;
const impactoBajo = registros.filter(
  r => r.impactoVisual === "Bajo"
).length;

const impactoMedio = registros.filter(
  r => r.impactoVisual === "Medio"
).length;

const impactoAlto = registros.filter(
  r => r.impactoVisual === "Alto"
).length;

const senalizacionCorrecta = registros.filter(
  r => r.senalizacion === "Correcta"
).length;

const senalizacionIncorrecta = registros.filter(
  r => r.senalizacion === "Incorrecta"
).length;
const porcentajeSenalizacionCorrecta =
  totalRegistros > 0
    ? ((senalizacionCorrecta / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeSenalizacionIncorrecta =
  totalRegistros > 0
    ? ((senalizacionIncorrecta / totalRegistros) * 100).toFixed(1)
    : 0;


const segregacionSi = registros.filter(
  r => r.segregacion === "Sí"
).length;

const segregacionNo = registros.filter(
  r => r.segregacion === "No"
).length;

const educacionSi = registros.filter(
  r => r.educacion === "Sí"
).length;

const educacionNo = registros.filter(
  r => r.educacion === "No"
).length;

const oloresPresentes = registros.filter(
  r => r.olores === "Presente"
).length;

const oloresAusentes = registros.filter(
  r => r.olores === "Ausente"
).length;

const lixiviadosSi = registros.filter(
  r => r.lixiviados === "Sí"
).length;

const lixiviadosNo = registros.filter(
  r => r.lixiviados === "No"
).length;

const porcentajeSegregacionSi =
  totalRegistros > 0
    ? ((segregacionSi / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeSegregacionNo =
  totalRegistros > 0
    ? ((segregacionNo / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeEducacionSi =
  totalRegistros > 0
    ? ((educacionSi / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeEducacionNo =
  totalRegistros > 0
    ? ((educacionNo / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeOloresPresentes =
  totalRegistros > 0
    ? ((oloresPresentes / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeOloresAusentes =
  totalRegistros > 0
    ? ((oloresAusentes / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeLixiviadosSi =
  totalRegistros > 0
    ? ((lixiviadosSi / totalRegistros) * 100).toFixed(1)
    : 0;

const porcentajeLixiviadosNo =
  totalRegistros > 0
    ? ((lixiviadosNo / totalRegistros) * 100).toFixed(1)
    : 0;

const distritos = {};
const promedioOrganicos =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.organicos || 0),
        0
      ) / registros.length
    : 0;
let distritoPredominante = "Sin registros";

if (Object.keys(distritos).length > 0) {
  distritoPredominante = Object.entries(distritos).reduce(
    (mayor, actual) =>
      actual[1] > mayor[1] ? actual : mayor
  )[0];
}
const promedioPlasticos =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.plasticos || 0),
        0
      ) / registros.length
    : 0;

const promedioPapel =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.papel || 0),
        0
      ) / registros.length
    : 0;

const promedioVidrio =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.vidrio || 0),
        0
      ) / registros.length
    : 0;

const promedioMetales =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.metales || 0),
        0
      ) / registros.length
    : 0;

const promedioOtros =
  registros.length > 0
    ? registros.reduce(
        (acc, r) => acc + Number(r.otros || 0),
        0
      ) / registros.length
    : 0;

registros.forEach((r) => {
  distritos[r.distrito] =
    (distritos[r.distrito] || 0) + 1;
});
const dataComposicion = [
  {
    name: "Orgánicos",
    value: Number(promedioOrganicos.toFixed(1))
  },
  {
    name: "Plásticos",
    value: Number(promedioPlasticos.toFixed(1))
  },
  {
    name: "Papel",
    value: Number(promedioPapel.toFixed(1))
  },
  {
    name: "Vidrio",
    value: Number(promedioVidrio.toFixed(1))
  },
  {
    name: "Metales",
    value: Number(promedioMetales.toFixed(1))
  },
  {
    name: "Otros",
    value: Number(promedioOtros.toFixed(1))
  }
];
const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#9C27B0",
  "#FF5722",
  "#607D8B"
];

  const obtenerUbicacion = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitud(pos.coords.latitude);
      setLongitud(pos.coords.longitude);
    });
  };

 const guardarRegistro = () => {
  if (total !== 100) {
    alert("La suma debe ser 100%");
    return;
  }

  const nuevoRegistro = {
    distrito,
    codigoPCRR,
    tipoPunto,
    infraestructura,
    estadoInfraestructura,
    fecha:
      editandoIndex !== null
        ? registros[editandoIndex].fecha
        : new Date().toLocaleString(),
    senalizacion,
    organicos,
    plasticos,
    papel,
    vidrio,
    metales,
    otros,
    potencialValorizacion,
recomendacionValorizacion,
porcentajeValorizable,
    segregacion,
    educacion,
    impactoVisual,
    olores,
    lixiviados,
    observacion,
    latitud,
    longitud,
    fotoGeneral,
    fotoDetalle,
    fotoContexto,
  };

  if (editandoIndex !== null) {
    const nuevosRegistros = [...registros];
    nuevosRegistros[editandoIndex] = nuevoRegistro;
    setRegistros(nuevosRegistros);
    setEditandoIndex(null);
    alert("Registro actualizado");
  } else {
    setRegistros([...registros, nuevoRegistro]);
    alert("Registro guardado");
  }

  setDistrito("");
  setTipoPunto("");
  setCodigoPCRR("");

  setInfraestructura("");
  setEstadoInfraestructura("");
  setSenalizacion("");

  setOrganicos(0);
  setPlasticos(0);
  setPapel(0);
  setVidrio(0);
  setMetales(0);
  setOtros(0);

  setSegregacion("");
  setEducacion("");

  setImpactoVisual("");
  setOlores("");
  setLixiviados("");

  setObservacion("");

  setLatitud("");
  setLongitud("");

  setFotoGeneral(null);
  setFotoDetalle(null);
  setFotoContexto(null);

  setPaso(1);
};
const exportarPDF = (registro) => {

  const doc = new jsPDF({
  orientation: "landscape"
});

  doc.setFontSize(18);
  doc.text("Ficha de Observación de Residuos", 20, 20);

  doc.setFontSize(12);

  doc.text(`Fecha: ${registro.fecha}`, 20, 40);
  doc.text(`Distrito: ${registro.distrito}`, 20, 50);
  doc.text(`Código PCRR: ${registro.codigoPCRR || "Sin código"}`, 20, 60);
  doc.text(`Tipo: ${registro.tipoPunto}`, 20, 70);

  doc.text(
    `Infraestructura: ${registro.infraestructura}`,
    20,
    80
  );

  doc.text(
    `Estado: ${registro.estadoInfraestructura}`,
    20,
    90
  );

  doc.text(
    `Impacto Visual: ${registro.impactoVisual}`,
    20,
    100
  );

  doc.text(
    `GPS: ${registro.latitud}, ${registro.longitud}`,
    20,
    110
  );

  doc.text(
    `Observación: ${registro.observacion}`,
    20,
    120
  );
  doc.text(
  `Señalización: ${registro.senalizacion}`,
  20,
  125
);

doc.text(
  `Segregación: ${registro.segregacion}`,
  20,
  135
);

doc.text(
  `Educación Ambiental: ${registro.educacion}`,
  20,
  145
);

doc.text(
  `Olores: ${registro.olores}`,
  20,
  155
);

doc.text(
  `Lixiviados: ${registro.lixiviados}`,
  20,
  165
);
  
  doc.text("COMPOSICIÓN DE RESIDUOS", 20, 130);

doc.text(`Orgánicos: ${registro.organicos}%`, 20, 140);
doc.text(`Plásticos: ${registro.plasticos}%`, 20, 150);
doc.text(`Papel: ${registro.papel}%`, 20, 160);
doc.text(`Vidrio: ${registro.vidrio}%`, 20, 170);
doc.text(`Metales: ${registro.metales}%`, 20, 180);
doc.text(`Otros: ${registro.otros}%`, 20, 190);

 
  if (registro.fotoGeneral) {
  doc.addImage(
    registro.fotoGeneral,
    "JPEG",
    170,
    30,
    50,
    50
  );
}

if (registro.fotoDetalle) {
  doc.addImage(
    registro.fotoDetalle,
    "JPEG",
    230,
    30,
    50,
    50
  );
}

if (registro.fotoContexto) {
  doc.addImage(
    registro.fotoContexto,
    "JPEG",
    170,
    100,
    50,
    50
  );

}
doc.save(`Registro_${registro.distrito}.pdf`);
};
const exportarExcel = () => {

  const datos = registros.map((r) => ({
    Fecha: r.fecha,
    "Código PCRR": r.codigoPCRR,
    Distrito: r.distrito,
    Tipo: r.tipoPunto,

    Infraestructura: r.infraestructura,
    Estado: r.estadoInfraestructura,
    Señalizacion: r.senalizacion,

    Segregacion: r.segregacion,
    EducacionAmbiental: r.educacion,

    ImpactoVisual: r.impactoVisual,
    Olores: r.olores,
    Lixiviados: r.lixiviados,

    Organicos: r.organicos,
    Plasticos: r.plasticos,
    Papel: r.papel,
    Vidrio: r.vidrio,
    Metales: r.metales,
    Otros: r.otros,
    PorcentajeValorizable: r.porcentajeValorizable,
    PotencialValorizacion: r.potencialValorizacion,
Recomendacion: r.recomendacionValorizacion,

    Observacion: r.observacion,

    Latitud: r.latitud,
    Longitud: r.longitud
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  hoja["!cols"] = [
  { wch: 20 }, // Fecha
  { wch: 18 }, // Código PCRR
  { wch: 18 }, // Distrito
  { wch: 18 }, // Tipo
  { wch: 18 }, // Infraestructura
  { wch: 18 }, // Estado
  { wch: 18 }, // Señalización
  { wch: 18 }, // Segregación
  { wch: 22 }, // Educación
  { wch: 18 }, // Impacto
  { wch: 12 }, // Orgánicos
  { wch: 12 }, // Plásticos
  { wch: 12 }, // Papel
  { wch: 12 }, // Vidrio
  { wch: 12 }, // Metales
  { wch: 12 }, // Otros
  { wch: 40 }, // Observación
  { wch: 15 }, // Latitud
  { wch: 15 }, // Longitud
];

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    libro,
    hoja,
    "Registros"
  );

  const estadisticas = [
      {
    Indicador: "Fecha de exportación",
    Valor: new Date().toLocaleString(),
  },
  {
    Indicador: "Proyecto",
    Valor: "Sistema de Observación de Residuos Sólidos",
  },

  { Indicador: "Total de registros", Valor: totalRegistros },
  { Indicador: "Mercados", Valor: totalMercados },
  { Indicador: "Parques", Valor: totalParques },

  { Indicador: "Infraestructura Sí", Valor: infraestructuraSi },
  { Indicador: "Infraestructura No", Valor: infraestructuraNo },

  { Indicador: "Impacto Bajo", Valor: impactoBajo },
  { Indicador: "Impacto Medio", Valor: impactoMedio },
  { Indicador: "Impacto Alto", Valor: impactoAlto },

  { Indicador: "Promedio Orgánicos (%)", Valor: promedioOrganicos.toFixed(1) },
  { Indicador: "Promedio Plásticos (%)", Valor: promedioPlasticos.toFixed(1) },
  { Indicador: "Promedio Papel (%)", Valor: promedioPapel.toFixed(1) },
  { Indicador: "Promedio Vidrio (%)", Valor: promedioVidrio.toFixed(1) },
  { Indicador: "Promedio Metales (%)", Valor: promedioMetales.toFixed(1) },
  { Indicador: "Promedio Otros (%)", Valor: promedioOtros.toFixed(1) },
];

const hojaEstadisticas = XLSX.utils.json_to_sheet(estadisticas);
const resumenDistritos = Object.entries(distritos).map(
  ([distrito, cantidad]) => ({
    Distrito: distrito,
    Registros: cantidad,
    Porcentaje: (
      (cantidad / totalRegistros) *
      100
    ).toFixed(1) + "%"
  })
);

const hojaDistritos =
  XLSX.utils.json_to_sheet(resumenDistritos);

XLSX.utils.book_append_sheet(
  libro,
  hojaDistritos,
  "Resumen Distritos"
);
XLSX.utils.book_append_sheet(
  libro,
  hojaEstadisticas,
  "Estadísticas"
);
 const fecha = new Date();

const nombreArchivo =
  `Registros_Residuos_${
    fecha.getFullYear()
  }-${
    String(fecha.getMonth() + 1).padStart(2, "0")
  }-${
    String(fecha.getDate()).padStart(2, "0")
  }_${
    String(fecha.getHours()).padStart(2, "0")
  }-${
    String(fecha.getMinutes()).padStart(2, "0")
  }.xlsx`;
const resumenTipos = [
  {
    Tipo: "Mercados",
    Registros: totalMercados,
    Porcentaje:
      ((totalMercados / totalRegistros) * 100).toFixed(1) + "%",
  },
  {
    Tipo: "Parques",
    Registros: totalParques,
    Porcentaje:
      ((totalParques / totalRegistros) * 100).toFixed(1) + "%",
  },
];

const hojaTipos =
  XLSX.utils.json_to_sheet(resumenTipos);

XLSX.utils.book_append_sheet(
  libro,
  hojaTipos,
  "Resumen Tipos"
);
XLSX.writeFile(libro, nombreArchivo);
  };

  return (
<>
    <div className="app">
     <h1 className="titulo">
  ♻ Sistema Digital de Observación
  <br />
  de Residuos Sólidos Urbanos
</h1>

<p className="subtitulo">
  Apoyo al levantamiento y análisis de residuos sólidos para la mejora de la calidad urbana
  <br />
  
</p>

      <div className="formulario">
        {paso === 1 && (
        <>
        <h2>Información General</h2>

        <label>Distrito</label>
        <select
  value={distrito}
  onChange={(e) => setDistrito(e.target.value)}
>
  <option value="">Seleccione</option>
  <option>Cusco</option>
  <option>Santiago</option>
  <option>Wanchaq</option>
  <option>San Sebastián</option>
  <option>San Jerónimo</option>
  <option>Saylla</option>
  <option>Poroy</option>
</select>
<label>Código PCRR *</label>

<input
  type="text"
  value={codigoPCRR}
  onChange={(e) => setCodigoPCRR(e.target.value)}
  placeholder="Ejemplo: SJ-139"
/>
        <label>Tipo de Punto</label>
        <select value={tipoPunto} onChange={(e)=>setTipoPunto(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Mercado / Centro de abastos</option>
          <option>Parque / Jardín</option>
        </select>

        <h2>🏗 Infraestructura</h2>

        <label>Existe infraestructura</label>
        <select value={infraestructura} onChange={(e)=>setInfraestructura(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <label>Estado</label>
        <select value={estadoInfraestructura} onChange={(e)=>setEstadoInfraestructura(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Bueno</option>
          <option>Regular</option>
          <option>Deteriorado</option>
        </select>

        <label>Señalización</label>
        <select value={senalizacion} onChange={(e)=>setSenalizacion(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Correcta</option>
          <option>Incorrecta</option>
          <option>Ausente</option>
        </select>

          </>
          )}
          {paso === 2 && (
          <>
        <h2>♻️ Composición de Residuos</h2>

        <label>Orgánicos {organicos}%</label>
        <input type="range" min="0" max="100" value={organicos} onChange={(e)=>setOrganicos(e.target.value)} />

        <label>Plásticos {plasticos}%</label>
        <input type="range" min="0" max="100" value={plasticos} onChange={(e)=>setPlasticos(e.target.value)} />

        <label>Papel {papel}%</label>
        <input type="range" min="0" max="100" value={papel} onChange={(e)=>setPapel(e.target.value)} />

        <label>Vidrio {vidrio}%</label>
        <input type="range" min="0" max="100" value={vidrio} onChange={(e)=>setVidrio(e.target.value)} />

        <label>Metales {metales}%</label>
        <input type="range" min="0" max="100" value={metales} onChange={(e)=>setMetales(e.target.value)} />

        <label>Otros {otros}%</label>
        <input type="range" min="0" max="100" value={otros} onChange={(e)=>setOtros(e.target.value)} />

        <h3>Total: {total}%</h3>
        <div className="resultado-valorizacion">

  <h3>♻ Potencial de valorización</h3>

  <p className="resultado-potencial">
    {potencialValorizacion}
  </p>

  <p className="texto-recomendacion">
    ✔ {recomendacionValorizacion}
  </p>

</div>

        <h2>🌱 Gestión</h2>

        <label>Segregación visible</label>
        <select value={segregacion} onChange={(e)=>setSegregacion(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <label>Elementos educativos</label>
        <select value={educacion} onChange={(e)=>setEducacion(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Sí</option>
          <option>No</option>
        </select>

         </>
         )}
        {paso === 3 && (
         <>

         <h2>🌿 Impacto Urbano</h2>

        <label>Impacto visual</label>
        <select value={impactoVisual} onChange={(e)=>setImpactoVisual(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Bajo</option>
          <option>Medio</option>
          <option>Alto</option>
        </select>

        <label>Olores</label>
        <select value={olores} onChange={(e)=>setOlores(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Ausente</option>
          <option>Moderado</option>
          <option>Fuerte</option>
        </select>

        <label>Lixiviados</label>
        <select value={lixiviados} onChange={(e)=>setLixiviados(e.target.value)}>
          <option value="">Seleccione</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <button onClick={obtenerUbicacion}>Obtener GPS</button>

        <p>Latitud: {latitud}</p>
        <p>Longitud: {longitud}</p>

        </>
        )}
        {paso === 4 && (
        <>
       <h3>📸 Evidencia Fotográfica</h3>

<label>Foto General</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const archivo = e.target.files[0];

const reader = new FileReader();

reader.onloadend = () => {
  setFotoGeneral(reader.result);
};

reader.readAsDataURL(archivo);
  }}
/>

<label>Foto Detalle</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const archivo = e.target.files[0];

const reader = new FileReader();

reader.onloadend = () => {
  setFotoDetalle(reader.result);
};

reader.readAsDataURL(archivo);
  }}
/>

<label>Foto Contexto</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const archivo = e.target.files[0];

const reader = new FileReader();

reader.onloadend = () => {
  setFotoContexto(reader.result);
};

reader.readAsDataURL(archivo);
  }}
/>

        <textarea
          rows="5"
          value={observacion}
          onChange={(e)=>setObservacion(e.target.value)}
          placeholder="Observaciones"
        />
        </>
        )}
        <div className="navegacion">

  {paso > 1 && (
    <button onClick={() => setPaso(paso - 1)}>
      ⬅ Anterior
    </button>
  )}

  {paso < 4 && (
    <button onClick={() => setPaso(paso + 1)}>
      Siguiente ➡
    </button>
  )}

 {paso === 4 && (
  <button onClick={guardarRegistro}>
    {editandoIndex !== null
      ? "💾 Actualizar Registro"
      : "💾 Guardar Registro"}
  </button>
  )}
</div>

<button
  className="btn-eliminar-todo"
  onClick={() => {

    const confirmar = window.confirm(
      "¿Eliminar todos los registros?"
    );

    if (!confirmar) return;

    console.log(fotoGeneral);
    console.log(fotoDetalle);
    console.log(fotoContexto);
    setRegistros([]);
    localStorage.removeItem("registros");
  }}
>
  🗑 Eliminar Todos
</button>
<button
  className="btn-pdf"
  onClick={exportarExcel}
>
  📊 Exportar Excel
</button>


<div className="resumen-levantamiento">

  <h2>📊 Resumen del levantamiento</h2>

  <div className="resumen-grid">

    <div>
      <strong>📋 Registros</strong>
      <p>{totalRegistros}</p>
    </div>

    <div>
      <strong>♻ Potencial predominante</strong>
      <p>{potencialPredominante}</p>
    </div>
    <div>

  <strong>🏪 Tipo predominante</strong>

  <p>{tipoPredominante}</p>

</div>

  </div>

</div>

<div className="estadisticas">
  <div className="dashboard-cards">

  

  <div className="card-dashboard">
    <h3>🏪</h3>
    <h2>{totalMercados}</h2>
    <p>Mercados</p>
  </div>

  <div className="card-dashboard">
    <h3>🌳</h3>
    <h2>{totalParques}</h2>
    <p>Parques</p>
  </div>

</div>
  <h2>📊 Estadísticas</h2>

  <div className="progress-item">

  <div className="progress-header">
    <span>🏗 Infraestructura</span>
    <span>{porcentajeInfraestructuraSi}%</span>
  </div>
  

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{
        width: `${porcentajeInfraestructuraSi}%`
      }}
    />

  </div>

</div>

<p>
  <strong>Infraestructura No:</strong>
  {" "}
  {infraestructuraNo} ({porcentajeInfraestructuraNo}%)
</p>

  <p><strong>Impacto Bajo:</strong> {impactoBajo}</p>
  <p><strong>Impacto Medio:</strong> {impactoMedio}</p>
  <p><strong>Impacto Alto:</strong> {impactoAlto}</p>

<hr className="separador-dashboard"/>

<h3 className="titulo-dashboard">
🏗 Infraestructura e Impacto
</h3>
  <h3>📝 Condiciones Observadas</h3>

<div className="progress-item">

  <div className="progress-header">
    <span>🏷 Señalización</span>
    <span>{porcentajeSenalizacionCorrecta}%</span>
  </div>
  <p className="progress-info">
  {segregacionSi} de {totalRegistros} puntos observados
</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${porcentajeSenalizacionCorrecta}%` }}
    />
  </div>

</div>

<div className="progress-item">

  <div className="progress-header">
    <span>♻ Segregación</span>
    <span>{porcentajeSegregacionSi}%</span>
  </div>
  <p className="progress-info">
  {segregacionSi} de {totalRegistros} puntos observados
</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${porcentajeSegregacionSi}%` }}
    />
  </div>

</div>

<div className="progress-item">

  <div className="progress-header">
    <span>📚 Educación Ambiental</span>
    <span>{porcentajeEducacionSi}%</span>
  </div>
  <p className="progress-info">
  {educacionSi} de {totalRegistros} puntos observados
</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${porcentajeEducacionSi}%` }}
    />
  </div>

</div>

<div className="progress-item">

  <div className="progress-header">
    <span>👃 Olores Ausentes</span>
    <span>{porcentajeOloresAusentes}%</span>
  </div>
  <p className="progress-info">
  {oloresAusentes} de {totalRegistros} puntos sin olores
</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${porcentajeOloresAusentes}%` }}
    />
  </div>

</div>

<div className="progress-item">

  <div className="progress-header">
    <span>💧 Sin Lixiviados</span>
    <span>{porcentajeLixiviadosNo}%</span>
  </div>
  <p className="progress-info">
  {lixiviadosNo} de {totalRegistros} puntos sin lixiviados
</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${porcentajeLixiviadosNo}%` }}
    />
  </div>

</div>

<p>
  <strong></strong>
  {" "}
  {lixiviadosNo}
  {" "}
  ({porcentajeLixiviadosNo}%)
</p>

  <hr className="separador-dashboard"/>

<h3 className="titulo-dashboard">
📍 Distribución Territorial
</h3>
  {Object.entries(distritos).map(([nombre, cantidad]) => (
  <p key={nombre}>
    <strong>{nombre}:</strong> {cantidad}
  </p>
))}

  <hr className="separador-dashboard"/>

<h3 className="titulo-dashboard">
♻ Composición de Residuos
</h3>
<p
  style={{
    textAlign: "center",
    color: "#666",
    marginBottom: "15px",
  }}
>
  Distribución promedio de los residuos observados
</p>

<div
  style={{
    width: "100%",
    height: 350,
    marginTop: "20px"
  }}
>
  <ResponsiveContainer>
    <PieChart>
      <Pie
  data={dataComposicion}
  cx="50%"
  cy="50%"
  outerRadius={120}
  dataKey="value"
  label={({ name, value }) => `${name}: ${value}%`}
>
        {dataComposicion.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
</div>


<h2>📋 Registros Guardados</h2>
<input
  type="text"
  placeholder="🔍 Buscar por distrito o tipo..."
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
  className="input-busqueda"
/>

{registros
  .filter((registro) => {
    const texto = busqueda.toLowerCase();

    return (
      registro.distrito.toLowerCase().includes(texto) ||
      registro.tipoPunto.toLowerCase().includes(texto) ||
      registro.observacion.toLowerCase().includes(texto) ||
      registro.fecha.toLowerCase().includes(texto)
    );
  })
  .map((registro, index) => (
  <div key={index} className="registro-card">

    <div className="registro-header">

  <span className="numero-registro">
    Ficha #{index + 1}
  </span>

  <h3 className="titulo-registro">
    📍 {registro.codigoPCRR || "Sin código"}
  </h3>

</div>

<div className="info-principal">

  <div className="info-item">
    <span className="info-label">🏙 Distrito</span>
    <strong>{registro.distrito}</strong>
  </div>

  <div className="info-item">
    <span className="info-label">🌳 Tipo</span>
    <strong>{registro.tipoPunto}</strong>
  </div>

  <div className="info-item">
    <span className="info-label">📅 Fecha</span>
    <strong>{registro.fecha}</strong>
  </div>

</div>
    <div className="potencial-registro">

  <strong>♻ Potencial:</strong>

  <span>{registro.potencialValorizacion}</span>

</div>

<p className="texto-potencial">

  {registro.recomendacionValorizacion}

</p>
<button
  className="btn-detalles"
  onClick={() =>
    setRegistroExpandido(
      registroExpandido === index ? null : index
    )
  }
>
  {registroExpandido === index
    ? "▲ Ocultar detalles"
    : "▼ Ver detalles"}
</button>
{registroExpandido === index && (
<>

    <p><strong>Tipo:</strong> {registro.tipoPunto}</p>

    <p><strong>Infraestructura:</strong> {registro.infraestructura}</p>

    <p><strong>Estado:</strong> {registro.estadoInfraestructura}</p>

    <p><strong>Impacto Visual:</strong> {registro.impactoVisual}</p>
    <p><strong>Orgánicos:</strong> {registro.organicos}%</p>

    <p><strong>Plásticos:</strong> {registro.plasticos}%</p>

    <p><strong>Papel:</strong> {registro.papel}%</p>

    <p><strong>Vidrio:</strong> {registro.vidrio}%</p>

    <p><strong>Metales:</strong> {registro.metales}%</p>

    <p><strong>Otros:</strong> {registro.otros}%</p>

    <p><strong>GPS:</strong> {registro.latitud}, {registro.longitud}</p>

    <p><strong>Observación:</strong> {registro.observacion}</p>

    {registro.fotoGeneral && (
  <img
    src={registro.fotoGeneral}
    alt="General"
    className="foto-preview"
  />
)}

{registro.fotoDetalle && (
  <img
    src={registro.fotoDetalle}
    alt="Detalle"
    className="foto-preview"
  />
)}

{registro.fotoContexto && (
  <img
    src={registro.fotoContexto}
    alt="Contexto"
    className="foto-preview"
  />
)}

</>
)}
<div className="acciones-registro">
<button
  className="btn-mapa"
  onClick={() =>
    window.open(
      `https://www.google.com/maps?q=${registro.latitud},${registro.longitud}`,
      "_blank"
    )
  }
>
  📍 Ubicación
</button>
<button
    className="btn-pdf"
    onClick={() => exportarPDF(registro)}
  >
    📄 PDF
  </button>
  <button
  className="btn-editar"
  onClick={() => editarRegistro(index)}
>
  ✏️ Editar
</button>

  <button
    className="btn-eliminar"
    onClick={() => {

      const confirmar = window.confirm(
        "¿Desea eliminar este registro?"
      );

      if (!confirmar) return;

      const nuevosRegistros = registros.filter(
        (_, i) => i !== index
      );

      setRegistros(nuevosRegistros);

      localStorage.setItem(
        "registros",
        JSON.stringify(nuevosRegistros)
      );

    }}
    
  >
    🗑 Eliminar 
  </button>
  </div>

</div>

))}

</div>
</div>
</>
);
}

export default App;
