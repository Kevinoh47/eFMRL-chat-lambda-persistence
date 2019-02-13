import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

  console.log({event});
  
  const params = {
    TableName: "chatmessages",
    Key: {
      room: event.pathParameters.room,
      messageId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);

    console.log("GET params: ", params);
    console.log("GET result: ", result);
    
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log({e});
    return failure({ status: false });
  }
}
