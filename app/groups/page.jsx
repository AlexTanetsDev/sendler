"use client";

import React from "react";
import { useState, useCallback } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

const CreateGroup = () => {
  // define mapping between determined types and PostgreSQL types
  // const PG = { n: "float8", s: "text", b: "boolean" };
  // function generate_sql(ws, wsname) {
  //   const aoo = XLSX.utils.sheet_to_json(ws);
  //   console.log("aoo:  ", aoo);
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
  const [file, setFile] = useState(null);
  // const [out, setOut] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const xport = useCallback(async () => {
    const ab = await (await file).arrayBuffer();
    const wb = XLSX.read(ab);
    const wsname = wb.SheetNames[0];
    const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    // setOut(generate_sql(wb.Sheets[wsname], wsname).join("\n"));

    try {
      const response = await axios.post(
        "api/sending-groups/create",
        { clients: clients }

        // file,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      if (response) {
        console.log("Group is created");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col items-center py-8">
      <form>
        <lable class="block mb-8">
          <span class="block">Name group</span>
          <input class="block" type="text" name="name" />
        </lable>
        <lable class="block mb-8">
          <input
            type="file"
            name="file"
            accept=".xls"
            onChange={handleFileChange}
            class="block"
          />
        </lable>
        <button type="submit" class="block" onClick={xport}>
          <b>Enter</b>
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
