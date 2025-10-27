const endpoints = {
  "1": "https://api-publica.datajud.cnj.jus.br/api_publica_stf/_search",
  "2": "https://api-publica.datajud.cnj.jus.br/api_publica_cnj/_search",
  "3": "https://api-publica.datajud.cnj.jus.br/api_publica_stj/_search",
  "4": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_trf1/_search",
    "02": "https://api-publica.datajud.cnj.jus.br/api_publica_trf2/_search",
    "03": "https://api-publica.datajud.cnj.jus.br/api_publica_trf3/_search",
    "04": "https://api-publica.datajud.cnj.jus.br/api_publica_trf4/_search",
    "05": "https://api-publica.datajud.cnj.jus.br/api_publica_trf5/_search"
  },
  "5": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_trt1/_search",
    "02": "https://api-publica.datajud.cnj.jus.br/api_publica_trt2/_search",
    "03": "https://api-publica.datajud.cnj.jus.br/api_publica_trt3/_search",
    "04": "https://api-publica.datajud.cnj.jus.br/api_publica_trt4/_search",
    "05": "https://api-publica.datajud.cnj.jus.br/api_publica_trt5/_search",
    "06": "https://api-publica.datajud.cnj.jus.br/api_publica_trt6/_search",
    "07": "https://api-publica.datajud.cnj.jus.br/api_publica_trt7/_search",
    "08": "https://api-publica.datajud.cnj.jus.br/api_publica_trt8/_search",
    "09": "https://api-publica.datajud.cnj.jus.br/api_publica_trt9/_search",
    "10": "https://api-publica.datajud.cnj.jus.br/api_publica_trt10/_search",
    "11": "https://api-publica.datajud.cnj.jus.br/api_publica_trt11/_search",
    "12": "https://api-publica.datajud.cnj.jus.br/api_publica_trt12/_search",
    "13": "https://api-publica.datajud.cnj.jus.br/api_publica_trt13/_search",
    "14": "https://api-publica.datajud.cnj.jus.br/api_publica_trt14/_search",
    "15": "https://api-publica.datajud.cnj.jus.br/api_publica_trt15/_search",
    "16": "https://api-publica.datajud.cnj.jus.br/api_publica_trt16/_search",
    "17": "https://api-publica.datajud.cnj.jus.br/api_publica_trt17/_search",
    "18": "https://api-publica.datajud.cnj.jus.br/api_publica_trt18/_search",
    "19": "https://api-publica.datajud.cnj.jus.br/api_publica_trt19/_search",
    "20": "https://api-publica.datajud.cnj.jus.br/api_publica_trt20/_search",
    "21": "https://api-publica.datajud.cnj.jus.br/api_publica_trt21/_search",
    "22": "https://api-publica.datajud.cnj.jus.br/api_publica_trt22/_search",
    "23": "https://api-publica.datajud.cnj.jus.br/api_publica_trt23/_search"
  },
  "6": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_tse/_search"
  },
  "7": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_stm/_search"
  },
  "8": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_tjac/_search",
    "02": "https://api-publica.datajud.cnj.jus.br/api_publica_tjal/_search",
    "03": "https://api-publica.datajud.cnj.jus.br/api_publica_tjap/_search",
    "04": "https://api-publica.datajud.cnj.jus.br/api_publica_tjam/_search",
    "05": "https://api-publica.datajud.cnj.jus.br/api_publica_tjba/_search",
    "06": "https://api-publica.datajud.cnj.jus.br/api_publica_tjce/_search",
    "07": "https://api-publica.datajud.cnj.jus.br/api_publica_tjdft/_search",
    "08": "https://api-publica.datajud.cnj.jus.br/api_publica_tjes/_search",
    "09": "https://api-publica.datajud.cnj.jus.br/api_publica_tjgo/_search",
    "10": "https://api-publica.datajud.cnj.jus.br/api_publica_tjma/_search",
    "11": "https://api-publica.datajud.cnj.jus.br/api_publica_tjmt/_search",
    "12": "https://api-publica.datajud.cnj.jus.br/api_publica_tjms/_search",
    "13": "https://api-publica.datajud.cnj.jus.br/api_publica_tjmg/_search",
    "14": "https://api-publica.datajud.cnj.jus.br/api_publica_tjpa/_search",
    "15": "https://api-publica.datajud.cnj.jus.br/api_publica_tjpb/_search",
    "16": "https://api-publica.datajud.cnj.jus.br/api_publica_tjpr/_search",
    "17": "https://api-publica.datajud.cnj.jus.br/api_publica_tjpe/_search",
    "18": "https://api-publica.datajud.cnj.jus.br/api_publica_tjpi/_search",
    "19": "https://api-publica.datajud.cnj.jus.br/api_publica_tjrj/_search",
    "20": "https://api-publica.datajud.cnj.jus.br/api_publica_tjrn/_search",
    "21": "https://api-publica.datajud.cnj.jus.br/api_publica_tjrs/_search",
    "22": "https://api-publica.datajud.cnj.jus.br/api_publica_tjro/_search",
    "23": "https://api-publica.datajud.cnj.jus.br/api_publica_tjrr/_search",
    "24": "https://api-publica.datajud.cnj.jus.br/api_publica_tjsc/_search",
    "25": "https://api-publica.datajud.cnj.jus.br/api_publica_tjse/_search",
    "26": "https://api-publica.datajud.cnj.jus.br/api_publica_tjsp/_search",
    "27": "https://api-publica.datajud.cnj.jus.br/api_publica_tjto/_search"
  },
  "9": {
    "01": "https://api-publica.datajud.cnj.jus.br/api_publica_tjmgo/_search",
    "02": "https://api-publica.datajud.cnj.jus.br/api_publica_tjmsp/_search",
    "03": "https://api-publica.datajud.cnj.jus.br/api_publica_tjmrs/_search"
  }
};

export function getEndpointByProcessNumber(processNumber: string) {
  const segments = processNumber.split(".");
  const ramoJustica = segments[2];
  const tribunal = segments[3];

  if (endpoints[ramoJustica] && endpoints[ramoJustica][tribunal]) {
    return endpoints[ramoJustica][tribunal];
  } else {
    throw new Error("Código de tribunal ou ramo da justiça desconhecido.");
  }
}

export function limparNumeroProcesso(processNumber) {
  return processNumber.replace(/[^\d]/g, '');
}

