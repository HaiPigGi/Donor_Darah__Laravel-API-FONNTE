<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\MessageCreated;
use App\Models\TagarModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;
class ChatMessageSend extends Controller
{

      /**
     * Associate a message with a tagar.
     *
     * @param  int  $tagarId
     * @param  int  $messageId
     * @param  string  $content
     * @return \Illuminate\Http\Response
     */
//     public function associateMessageWithTagar($tagarId, Request $request)
// {
//     // Find the tagar
//     //  $tagar = TagarModel::findOrFail($tagarId);
//     $tagar = TagarModel::find($tagarId);

//     // Check if the tagar is found
//     if (!$tagar) {
//         return response()->json(['error' => 'Tagar not found'], 404);
//     }

//     // Get the authenticated user
//     $user = Auth::user();

//     // Validate the request data as needed
//     $request->validate([
//         'content' => 'required|string',
//     ]);

//     Log::info("cek User yang Login : " . json_encode($user));

//     DB::beginTransaction();

//     try {
//         if ($tagar && $user) {
//             // Create a new message instance for the authenticated user
//             $messageId = (string) Str::uuid();
    
//             Log::info("cek Tagar ada atau null : " . json_encode($tagarId));
    
//             $message = $tagar->messages()->create([
//                 'id_user' => $user->id,
//                 'message_id' => $messageId,
//                 'tagar_model_id' => $tagarId,
//                 'tagar_id' => $tagarId,
//                 'content' => $request->input('content'),
//             ]);
    
//             // Associate the message with the tagar
//             $tagar->messages()->save($message);
//             broadcast(new MessageCreated($message));
    
//             DB::commit();
    
//             return response()->json(['success' => 'User message associated with tagar successfully']);
//         } else {
//             return response()->json(['error' => 'Tagar or user not found'], 404);
//         }
//     } catch (\Exception $e) {
//         Log::error('Exception occurred while Creating Message: ' . $e->getMessage());
//         DB::rollBack();
//         return response()->json(['Failed To Create Message'], 500);
//     }
// }


//     /**
//      * Get messages associated with a tagar.
//      *
//      * @param  int  $tagarId
//      * @return \Illuminate\Http\Response
//      */
//     public function getMessagesForTagar($tagarId)
//     {
//         // Find the tagar
//         $tagar = TagarModel::findOrFail($tagarId);

//         // Retrieve messages associated with the tagar
//         $messages = $tagar->messages;

//         return response()->json(['messages' => $messages]);
//     }
// }




     /**
 * Send the verification code via Fontee API to the user's WhatsApp number.
 *
 * @param  \Illuminate\Http\Request  $request
 */
protected function sendMessage(Request $request, $tagarId)
{
    // Get the authenticated user
    $user = Auth::user();

    // Get the tagar based on the provided tagarId
    $tagar = TagarModel::find($tagarId);

    if (!$tagar) {
        Log::error('Tagar not found for tagarId: ' . $tagarId);
        return response()->json(['error' => 'Tagar not found'], 404);
    }

    // Validate the request data as needed
   $content= $request->validate([
        'content' => 'required|string',
    ]);

    DB::beginTransaction();

    try {
        // Generate a unique message_id
        $messageId = (string) Str::uuid();

        // Ensure the messages relationship is loaded
        $tagar = $tagar->load('messages');

        // Create a new message instance
        $message = new Message([
            'id_user' => $user->id,
            'message_id' => $messageId,
            'content' => $request->input('content'),
        ]);
        // Save the message to the tagar
        $tagar->messages()->save($message);

        // Commit the transaction
        DB::commit();

        Log::info("cek info dari user : ".json_encode($user));

        // Broadcast the message
        broadcast(new MessageCreated($user, $message));
        // You can return a response if needed
        return response()->json(['success' => 'Message sent successfully', 'message' => $message], 200);

    } catch (\Exception $e) {
        // Rollback the transaction in case of an exception
        DB::rollback();

        // Log the exception details for debugging
        Log::error('Exception occurred while Creating Message: ' . $e->getMessage());

        // You might want to broadcast an event indicating a failure here if needed
        return response()->json(['error' => 'Failed to create Message. Please try again.'], 500);
    }
}


}