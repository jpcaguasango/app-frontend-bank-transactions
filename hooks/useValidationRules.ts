const useValidationRules = () => {
  const rules = {
    required: () => ({ required: 'Campo requerido' }),
    min: (length: number) => ({
      min: {
        value: length,
        message: `El valor debe ser mayor o igual a ${length}`,
      },
    }),
    max: (length: number) => ({
      max: {
        value: length,
        message: `El valor debe ser menor o igual a ${length}`,
      },
    }),
    minLength: (length: number) => ({
      minLength: {
        value: length,
        message: `Minimo ${length} caracteres`,
      },
    }),
    maxLength: (length: number) => ({
      maxLength: {
        value: length,
        message: `Maximo ${length} caracteres`,
      },
    }),
    pattern: (regex: RegExp, message: string) => ({
      pattern: { value: regex, message },
    }),
    email: () => ({
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Ingrese un correo válido',
      },
    }),
    phone: () => ({
      pattern: {
        value: /^(3\d{9}|60[1-8]\d{7})$/,
        message: 'Ingrese un teléfono válido',
      },
    }),
    onlyNumbers: () => ({
      pattern: {
        value: /^[0-9]+$/,
        message: 'Solo números',
      },
    }),
    onlyLetters: () => ({
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Solo letras',
      },
    }),
    onlyLettersAndSpaces: () => ({
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Solo letras y espacios',
      },
    }),
    onlyLettersAndNumbers: () => ({
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: 'Solo letras y números',
      },
    }),
    onlyLettersAndNumbersAndSpaces: () => ({
      pattern: {
        value: /^[a-zA-Z0-9\s]+$/,
        message: 'Solo letras, números y espacios',
      },
    }),
    onlyLettersAndPoints: () => ({
      pattern: {
        value: /^[a-zA-Z.]+$/,
        message: 'Solo letras y puntos',
      },
    }),
    onlyLettersWithAccentsAndSpaces: () => ({
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.]+$/,
        message: 'No se permiten guiones ni signos',
      },
    }),
    onlyLettersWithAccentsNumbersAndSpaces: () => ({
      pattern: {
        value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.]+$/,
        message: 'No se permiten guiones ni signos',
      },
    }),
    percentage: () => ({
      pattern: {
        value: /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/,
        message: 'Solo porcentajes validos',
      },
    }),
  }

  const getValidationRules = (validations: string[]) => {
    return validations.reduce(
      (acc, rule) => {
        const [key, rawValue, message] = rule.split(':')

        if (!(key in rules)) {
          console.warn(`Regla desconocida: ${key}`)
          return acc
        }

        if (key === 'pattern' && rawValue) {
          try {
            const regex = new RegExp(rawValue.slice(1, -1))
            Object.assign(
              acc,
              rules.pattern(regex, message || 'Formato inválido')
            )
          } catch (error) {
            console.error(
              `Error en la expresión regular: ${rawValue} - ${error}`
            )
          }
        } else {
          const ruleFunction = rules[key as keyof typeof rules]

          if (typeof ruleFunction === 'function') {
            if (
              [
                'required',
                'email',
                'phone',
                'onlyNumbers',
                'onlyLetters',
                'onlyLettersAndSpaces',
                'onlyLettersAndNumbers',
                'onlyLettersAndNumbersAndSpaces',
                'onlyLettersAndPoints',
                'onlyLettersWithAccentsAndSpaces',
                'onlyLettersWithAccentsNumbersAndSpaces',
                'percentage',
              ].includes(key)
            ) {
              // @ts-ignore-line
              Object.assign(acc, ruleFunction())
            } else if (rawValue !== undefined) {
              // @ts-ignore-line
              Object.assign(acc, ruleFunction(Number(rawValue)))
            }
          }
        }

        return acc
      },
      {} as Record<string, unknown>
    )
  }

  return { getValidationRules }
}

export default useValidationRules
