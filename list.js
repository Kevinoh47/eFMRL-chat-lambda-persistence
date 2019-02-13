import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

  // console.log({event})

  const params = {
    TableName: "chatmessages",

    KeyConditionExpression: "room = :room",
    ExpressionAttributeValues: {
      ":room": event.queryStringParameters.room
    }
  };

  console.log({params});

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log('event: ', e);
    console.log('params: ', params);
    return failure({ status: false });
  }
}
