import { baseUrl } from '@/config/env'
import { Url } from 'url'

const PAINT_APP_ID = 0

// start 函数:
// 参数: username (用户名)
// 作用: 向后端发送 POST 请求，开始一个以用户 username 为标识的应用会话。
// 处理: 如果请求成功且返回 success 标志，则返回响应中的数据；否则返回 undefined。
export async function start({ username }: { username: string }) {
  try {
    const res = await fetch(`${baseUrl}/designWeb/start`, {
      method: 'POST',
      body: JSON.stringify({
        username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return undefined
    return result.data
  } catch (error: any) {
    throw new Error(`获取用户信息失败: ${error.message}`)
  }
}

// save 函数:
// 参数: username (用户名), data (要保存的数据对象)
// 作用: 向后端发送 POST 请求，保存当前用户的数据。
// 处理: 如果请求不成功，则抛出一个错误信息，表明保存数据失败。
export async function save({
  username,
  data,
}: {
  username: string
  data: object
}) {
  try {
    const res = await fetch(`${baseUrl}/designWeb/save`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) {
      throw new Error('保存数据失败：' + result.message)
    }
  } catch (error: any) {
    throw new Error(`${error.message}`)
  }
}

export async function saveImage({
  ImageName,
  Image,
}: {
  ImageName: string
  Image: string
}) {
  try {
    const res = await fetch(`${baseUrl}/designWeb/saveImage`, {
      method: 'POST',
      body: JSON.stringify({
        ImageName,
        Image,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) {
      throw new Error('保存图片失败：' + result.message)
    }
  } catch (error: any) {
    throw new Error(`${error.message}`)
  }
}

// getProblemToProblemStimulus 函数:
// 参数: task (设计问题), num (数量)
// 作用: 从一个设计问题生成多个设计问题。
// 处理: 发送 POST 请求到后端，请求生成设计问题。返回结果数据或者空数组。
export async function getProblemToProblemStimulus({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 0,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getSolutionToProblemStimulus({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 1,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getProblemToSolutionStimulus({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 2,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getSolutionToSolutionStimulus({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 3,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}
export async function getProblemToProblemImages({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 4,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getSolutionToProblemImages({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 5,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getProblemToSolutionImages({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 6,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}

export async function getSolutionToSolutionImages({
  task,
  num,
}: {
  task: string
  num: number
}) {
  try {
    const res = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 7,
        prompts: {
          task,
          num,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []
    return result.data.result
  } catch (error: any) {
    throw new Error(`生成刺激失败: ${error.message}`)
  }
}
export async function Evaluate({
  problems,
  solutions,
}: {
  problems: object
  solutions: object
}) {
  try {
    const res = await fetch(`${baseUrl}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({
        appid: PAINT_APP_ID,
        type: 8,
        prompts: {
          problems,
          solutions,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    if (!result.success) return []

    // 直接返回result.data
    return result.data
  } catch (error) {
    throw new Error(`评估失败: ${error.message}`)
  }
}
