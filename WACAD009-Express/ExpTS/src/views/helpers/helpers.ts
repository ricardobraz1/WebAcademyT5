import { Tecnologies  } from "../../types/main";

export function listTecnologies(tec: Tecnologies[]){
    return `<ul>${tec.filter((t) => t.poweredByNodejs).map((t)=> `<li>${t.name} - ${t.type}</li>`).join("")}</ul>`
}