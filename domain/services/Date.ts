export function formatarDataParaFormatoBr(data: string | undefined) {
  if (!data) {
    return "";
  }

  let partesData = data.split("-");
  if (partesData.length === 3) {
    let ano = partesData[0];
    let mes = partesData[1];
    let dia = partesData[2];
    let dataFormatada =
      dia.padStart(2, "0") + "/" + mes.padStart(2, "0") + "/" + ano;

    return dataFormatada;
  }
  return data;
}

export function formatarDataParaFormatoAmericano(data: string | undefined) {
  if (!data) {
    return "";
  }

  let partesData = data.split("/");
  if (partesData.length === 3) {
    let dia = partesData[0];
    let mes = partesData[1];
    let ano = partesData[2];
    let dataFormatada =
      ano + "-" + mes.padStart(2, "0") + "-" + dia.padStart(2, "0");

    return dataFormatada;
  }
  return data;
}
