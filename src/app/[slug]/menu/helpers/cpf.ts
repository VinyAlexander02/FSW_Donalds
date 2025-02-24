export const removeCpfPunctuation = (cpf: string) => {
  return cpf.replace(/[\.\-]/g, "");
};

export const isValidCpf = (cpf: string): boolean => {
  // Remove os caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Elimina CPFs com todos os dígitos iguais (ex: 000.000.000-00)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Função auxiliar para calcular os dígitos verificadores
  const calcularDigito = (baseCpf: string, pesoInicial: number): number => {
    let soma = 0;
    for (let i = 0; i < baseCpf.length; i++) {
      soma += parseInt(baseCpf[i]) * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  // Cálculo do primeiro e segundo dígitos verificadores
  const digito1 = calcularDigito(cpf.slice(0, 9), 10);
  const digito2 = calcularDigito(cpf.slice(0, 10), 11);

  // Verifica se os dígitos calculados correspondem aos informados no CPF
  return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
};
