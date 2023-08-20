import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

export async function callLocalLambda(FunctionName, Payload = {}) {
  const client = new LambdaClient({
    endpoint: "http://127.0.0.1:3001",
    region: "sa-east-1",
  });

  const command = new InvokeCommand({
    FunctionName,
    Payload: JSON.stringify(Payload),
  });

  try {
    const data = await client.send(command);
    return JSON.parse(Buffer.from(data.Payload).toString());
  } catch (error) {
    console.log(error);
    return false;
  }
}
