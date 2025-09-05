export default class CodeGenerator {

  static genCode(): number {
    const timestampMs = Date.now()
    const randomSuffix = Math.floor(Math.random() * 1000)
    const fullCode = `${timestampMs}${randomSuffix}`

    // pega só os 10 últimos dígitos
    const last10 = fullCode.slice(-10)
    return Number(last10)
  }

}