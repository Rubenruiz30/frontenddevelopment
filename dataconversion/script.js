function jsonToCsv(json) {
  const claves = Object.keys(json[0]);
  const filas = json.map(obj => claves.map(c => obj[c]).join(","));
  return claves.join(",") + "\n" + filas.join("\n");
}


function jsonToXml(json) {
  let xml = "<tareas>";
  json.forEach(obj => {
    xml += "<tarea>";
    for (let clave in obj) {
      xml += `<${clave}>${obj[clave]}</${clave}>`;
    }
    xml += "</tarea>";
  });
  xml += "</tareas>";
  return xml;
}


function csvToJson(csv) {
  const lineas = csv.trim().split("\n");
  const claves = lineas[0].split(",");
  return JSON.stringify(
    lineas.slice(1).map(linea => {
      const valores = linea.split(",");
      const obj = {};
      claves.forEach((c, i) => obj[c] = valores[i]);
      return obj;
    }),
    null,
    2
  );
}

function xmlToJson(xmlTexto) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlTexto, "text/xml");
  const tareas = [...xml.getElementsByTagName("tarea")];

  const resultado = tareas.map(t => ({
    id: t.getElementsByTagName("id")[0].textContent,
    titulo: t.getElementsByTagName("titulo")[0].textContent,
    completada: t.getElementsByTagName("completada")[0].textContent
  }));

  return JSON.stringify(resultado, null, 2);
}
function convertir() {
  const entrada = document.getElementById("entrada").value;
  const tipo = document.getElementById("tipoConversion").value;
  let salida = "";

  if (tipo === "json-csv") salida = jsonToCsv(JSON.parse(entrada));
  if (tipo === "json-xml") salida = jsonToXml(JSON.parse(entrada));
  if (tipo === "csv-json") salida = csvToJson(entrada);
  if (tipo === "xml-json") salida = xmlToJson(entrada);

  document.getElementById("salida").value = salida;
}