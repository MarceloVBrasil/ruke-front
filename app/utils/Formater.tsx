export function onlyNumber(value: string) {
  return value.replace(/\D/gi, "").trim();
}

export function formatCpf(cpf: string) {
  if (cpf) {
    let formatedCpf = cpf.replace(/\D/g, "");
    if (formatedCpf.length > 11) {
      formatedCpf = formatedCpf.slice(0, 11);
    }
    formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formatedCpf = formatedCpf.replace(/(\d{3})(\d{2})$/, "$1-$2");
    return formatedCpf;
  }
  return cpf;
}

export function formatRG(rg: string) {
  let formattedRG = rg.replace(/\D/g, "");
  if (formattedRG.length > 9) {
    formattedRG = formattedRG.slice(0, 9);
  }
  // Adaptação do formato do RG de acordo com a convenção desejada
  formattedRG = formattedRG.replace(/(\d{2})(\d)/, "$1.$2");
  formattedRG = formattedRG.replace(/(\d{3})(\d)/, "$1.$2");
  formattedRG = formattedRG.replace(/(\d{3})(\d)/, "$1-$2");
  return formattedRG;
}

export function formatCnpj(cnpj: string) {
  if (cnpj) {
    let formatedCnpj = cnpj.replace(/\D/g, "");
    if (formatedCnpj.length > 14) {
      formatedCnpj = formatedCnpj.slice(0, 14);
    }
    formatedCnpj = formatedCnpj.replace(/(\d{2})(\d)/, "$1.$2");
    formatedCnpj = formatedCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    formatedCnpj = formatedCnpj.replace(/(\d{3})(\d)/, "$1/$2");
    formatedCnpj = formatedCnpj.replace(/(\d{4})(\d)/, "$1-$2");
    return formatedCnpj;
  }
  return cnpj;
}

export function formatCpfCnpj(value: string) {
  let formattedValue = value.replace(/\D/g, "");

  if (formattedValue.length > 11) {
    formattedValue = formattedValue.slice(0, 14);
    formattedValue = formattedValue.replace(/(\d{2})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1/$2");
    formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    formattedValue = formattedValue.slice(0, 11);
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return formattedValue;
}

export function formatCepInput(cep: string) {
  let cepFormated = cep.replace(/\D/g, "");
  if (cepFormated.length > 8) {
    cepFormated = cepFormated.slice(0, 8);
  }
  cepFormated = cepFormated.replace(/^(\d{5})(\d)/, "$1-$2");
  return cepFormated;
}

export function capitalizeFirstLetter(str: string) {
  return str
    .toLowerCase()
    .replace(/(\b[a-z](?!\s))/g, function (char) {
      return char.toUpperCase();
    })
    .replace(/\b(\w*?[A-Z]{2,}\w*?)\b/g, function (sigla) {
      return sigla.toUpperCase();
    });
}

export function formatOabInput(oab: string) {
  if (!oab) return ''

  let oabFormated = oab.replace(/[^\dA-Za-z]/gi, "");
  if (oabFormated.length > 20) {
    oabFormated = oabFormated.slice(0, 20);
  }
  oabFormated = oabFormated.toUpperCase();
  return oabFormated;
}

export function formatPhoneNumber(phoneNumber: string) {
  let formattedNumber = phoneNumber.replace(/[^\d]/g, "");
  if (formattedNumber.length > 11) {
    formattedNumber = formattedNumber.slice(0, 11);
  }

  formattedNumber = `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(
    2,
    7
  )}-${formattedNumber.slice(7)}`;
  return formattedNumber;
}

export function formatMoney(value: string) {
  value = value.replace(/^0+/, "");
  value = (parseFloat(value) / 100).toFixed(2);
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!isNaN(parseFloat(value))) {
    return value;
  }
  return "0.00";
}

export function formatCurrency(input: string): number {
  if (!input) return 0
  // Remove everything that's not a digit, comma, or period
  let cleaned: string = input.replace(/[^\d.,]/g, '');

  // If there's a period in the last three characters, assume it's the decimal separator
  const lastPeriodIndex = cleaned.lastIndexOf('.');

  if (lastPeriodIndex !== -1 && cleaned.length - lastPeriodIndex <= 3) {
    // Replace the last period with a comma (for decimal point)
    cleaned = cleaned.substring(0, lastPeriodIndex) + ',' + cleaned.substring(lastPeriodIndex + 1);
  }

  // Remove any remaining periods (thousands separators)
  cleaned = cleaned.replace(/\./g, '');

  // Replace the comma with a period to prepare for conversion to a floating-point number
  cleaned = cleaned.replace(',', '.');

  // Convert to a floating-point number and fix to 2 decimal places
  let result: string = parseFloat(cleaned).toFixed(2);

  return result == 'NaN' ? 0 : parseFloat(result);
}


export function formatNumeroProcesso(numero_processo: string) {
  if (!numero_processo) return ''

  const mask = "9999999-99.9999.9.99.9999";
  let numericInput = numero_processo.replace(/\D/g, '');
  let inputIterator = numericInput[Symbol.iterator]();

  let formatted = '';
  for (let char of mask) {
    if (char === '9') {
      let nextDigit = inputIterator.next().value;
      if (nextDigit) {
        formatted += nextDigit;
      } else {
        break;
      }
    } else {
      formatted += char;
    }
  }

  return formatted;
}

export function formatarPercentualString(text: string | number): string | undefined {
  if (!text) return

  if (typeof text === 'string') return converterStringToPercentual(text)
  return converterNumeroToPercentual(text)
}

export function formatarPercentualNumber(text: string | number): number | undefined {
  if (!text) return

  if (typeof text === 'string') return parseFloat(converterStringToPercentual(text))
  return parseFloat(converterNumeroToPercentual(text))
}

function converterStringToPercentual(text: string) {
  const numero = parseFloat(text)
  return converterNumeroToPercentual(numero)
}

function converterNumeroToPercentual(numero: number) {
  return numero.toFixed(2)
}

export function formatToBrlCurrency(input: string | number): string {
  const number = typeof input === 'string'
    ? parseFloat(input.replace(/\./g, '').replace(',', '.'))
    : input;

  return isNaN(number)
    ? 'R$ 0,00'
    : new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number);
}
