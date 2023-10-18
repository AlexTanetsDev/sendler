import * as XLSX from "xlsx/xlsx.mjs";

export async function POST(request, response) {
  const { clients } = await request.json();
  console.log(clients);

  // const PG = { n: "float8", s: "text", b: "boolean" };
  // function generate_sql(ws, wsname) {
  //   const aoo = XLSX.utils.sheet_to_json(ws);
  //   const types = {},
  //     hdr = [];
  //   // loop across each key in each column
  //   aoo.forEach((row) =>
  //     Object.entries(row).forEach(([k, v]) => {
  //       // set up type if header hasn't been seen
  //       if (!types[k]) {
  //         types[k] = "?";
  //         hdr.push(k);
  //       }
  //       // check and resolve type
  //       switch (typeof v) {
  //         case "string":
  //           types[k] = "s";
  //           break;
  //         case "number":
  //           if (types[k] != "s") types[k] = "n";
  //           break;
  //         case "boolean":
  //           if ("?b".includes(types[k])) types[k] = "b";
  //           break;
  //         default:
  //           types[k] = "s";
  //           break;
  //       }
  //     })
  //   );
  //   return [
  //     // generate CREATE TABLE query and return batch
  //     `CREATE TABLE \`${wsname}\` (${hdr
  //       .map((h) => `\`${h}\` ${PG[types[h]]}`)
  //       .join(", ")});`,
  //   ]
  //     .concat(
  //       aoo.map((row) => {
  //         const entries = Object.entries(row);
  //         const fields = [],
  //           values = [];
  //         entries.forEach(([k, v]) => {
  //           if (v == null) return;
  //           fields.push(`\`${k}\``);
  //           if (types[k] == "n")
  //             values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);
  //           else values.push(`'${v.toString().replaceAll("'", "''")}'`);
  //         });
  //         if (fields.length)
  //           return `INSERT INTO \`${wsname}\` (${fields.join(
  //             ", "
  //           )}) VALUES (${values.join(", ")})`;
  //       })
  //     )
  //     .filter((x) => x)
  //     .slice(0, 6);
  // }

  // const ab = await (await request).arrayBuffer();
  // const wb = XLSX.read(ab);
  // const wsname = wb.SheetNames[0];
  // const aoo = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
  // console.log(aoo);
  // const out = generate_sql(wb.Sheets[wsname], wsname).join("\n");
  // console.log(out);
  return new Response("Good", { status: 200 });
}
