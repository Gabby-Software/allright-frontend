/* eslint-disable @typescript-eslint/ban-ts-comment */
export const formatCardNumber = (value: string) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
  const onlyNumbers = value.replace(/[^\d]/g, '')

  //   @ts-ignore
  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  )
}

export const formatExpiryDate = (string: string) => {
  return string
    .replace(
      /[^0-9]/g,
      '' // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1' // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2' // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0' // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2' // To handle 113 > 11/3
    )
}
