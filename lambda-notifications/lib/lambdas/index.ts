import type { Handler } from "aws-cdk-lib/aws-lambda";

export const handler: Handler = async (_event: unknown, _context: any) => {
    console.log('Lambda triggered Sample Error Notification');
    // return {
    //     statusCode: 400,
    //     body: JSON.stringify({
    //         message: 'Sample Error Created',
    //     }),
    // };
    throw new Error("Sample Error Created 404");
    
}