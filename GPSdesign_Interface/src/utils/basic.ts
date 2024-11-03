export const mobxProxyTrans = (mobxData: unknown) => {
  return JSON.parse(JSON.stringify(mobxData))
}

// 计算 number[] 数组的最大值
export const calcNumberArrayMax = (numbers: number[]): number => {
  let temp = numbers[0]
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > temp) {
      temp = numbers[i]
    }
  }

  return temp
}

// 计算 number[] 数组的最小值
export const calcNumberArrayMin = (numbers: number[]): number => {
  let temp = numbers[0]
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < temp) {
      temp = numbers[i]
    }
  }

  return temp
}

// 返回Linux 11位时间戳的小时和分钟字符串
export const getCurrentHourAndMinute = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
