import { RecordBase } from "../type/record.ts";

const promot = `
Extract transaction message into following JSON format, type should assumption based on the context.
{
  "direction": "income" | "outcome",
  "type": "daily" | "invest" | "repay loan" | "transfer" | "transport" | "car" | "health" | "eat" | "pet" | "other",
  "time": string,
  "platform": "alipay" | "wechat" | "other"
  "amount": number,
  "balance": number,
}

MESSAGE: 
`

const request = {
  "messages": [
    {
      "role": "system",
      "content": "You are a financial assistance, you need to help user to extract transaction message into following JSON format, type should assumption based on the context."
    },
    {
      "role": "user",
      "content": ""
    }
  ],
  "stream": false,
  "model": "gpt-4-turbo-preview",
  "temperature": 0.3,
  "presence_penalty": 0,
  "frequency_penalty": 0,
  "top_p": 1,
  "response_format": {
    "type": "json_object"
  }
}

export async function extractMessage(message: string): Promise<RecordBase>{
  request.messages[1].content = promot + message
  const response = await fetch("https://chat.taos7.top/api/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Deno.env.get("OPENAI_API_KEY")!
    },
    body: JSON.stringify(request)
  })
  const data = await response.json()
  console.log(data)
  const result: string = data.choices[0].message.content
  return JSON.parse(result) as RecordBase
}