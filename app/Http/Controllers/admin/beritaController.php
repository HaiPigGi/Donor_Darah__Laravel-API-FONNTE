<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class beritaController extends Controller
{

    /**
     * Get all posts with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataStore()
<<<<<<< HEAD
{
    try {
        // Get all posts
        $posts = Post::all();
        Log::info("cek All data post : " . json_encode($posts));

        // Retrieve image details for each post
        $postsWithImages = $posts->map(function ($post) {
            $imagePath = 'storage/post/' . $post->image;

            // Check if the file exists before getting the size
            if (File::exists($imagePath)) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'event' => $post->event,
                    'image' => [
                        'url' => asset($imagePath),
=======
    {
        try {
            // Get all posts
            $posts = Post::all();
            Log::info("cek All data post : ".json_encode($posts));

            // Retrieve image details for each post
            $postsWithImages = $posts->map(function ($post) {
                $imagePath = 'storage/post/' . $post->image;

                return [
                    'id'      => $post->id,
                    'title'   => $post->title,
                    'content' => $post->content,
                    'event'   => $post->event,
                    'image'   => [
                        'url'  => asset($imagePath),
>>>>>>> origin/main
                        'path' => $imagePath,
                        'size' => File::size($imagePath),
                    ],
                ];
<<<<<<< HEAD
            } else {
                // Log a warning if the file does not exist
                Log::warning('Image not found: ' . $imagePath);
                return null; // or handle it as needed
            }
        })->filter(); // Filter out null values (non-existent images)

        Log::info("cek All data post : " . json_encode($postsWithImages));

        return response()->json(['posts' => $postsWithImages], 200);
    } catch (\Exception $e) {
        // Log the error
        Log::error('Error getting all posts:', ['error' => $e->getMessage()]);

        // Return a JSON response with an error message
        return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
    }
}
=======
            });
            Log::info("cek All data post : ".json_encode($postsWithImages));

            return response()->json(['posts' => $postsWithImages], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting all posts:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }
>>>>>>> origin/main
    /**
     * Get all posts with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataStoreByID($id)
{
    try {
        // Get a specific post by ID
        $post = Post::find($id);

        if (!$post) {
            // Return a JSON response indicating that the post with the provided ID was not found
            return response()->json(['error' => 'Post not found.'], 404);
        }

        // Retrieve image details for the post
        $imagePath = 'storage/post/' . $post->image;
        $postWithImage = [
            'id'      => $post->id,
            'title'   => $post->title,
            'content' => $post->content,
            'event'   => $post->event,
            'image'   => [
                'url'  => asset($imagePath),
                'path' => $imagePath,
                'size' => File::size($imagePath),
            ],
        ];

        // Return the post data as a JSON response
        return response()->json(['post' => $postWithImage], 200);
    } catch (\Exception $e) {
        // Log the error
        Log::error('Error getting post by ID:', ['error' => $e->getMessage()]);

        // Return a JSON response with an error message
        return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
    }
}


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
{
    try {
        // Start the database transaction
        DB::beginTransaction();

        Log::info('Request data:', $request->all());

        // Validate form
        $validator = validator($request->all(), [
            'image'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
            'title'   => 'required|min:5',
            'content' => 'required|min:10',
            'event'   => 'required'
        ]);

        if ($validator->fails()) {
            // Log validation errors
            Log::error('Validation errors:', ['errors' => $validator->errors()->all()]);

            return response()->json(['error' => 'Data yang diberikan tidak valid.'], 422);
        }

        $image = $request->file('image');
        $image->storeAs('public/post', $image->hashName());

        // Create the post using the Post model
        Post::create([
            'image'   => $image->hashName(),
            'title'   => $request->title,
            'content' => $request->content,
            'event'   => $request->event
        ]);

        // Commit the database transaction
        DB::commit();

        return response()->json(['message' => 'Data Berhasil Disimpan!'], 200);
    } catch (\Exception $e) {
        // An error occurred, rollback the transaction
        DB::rollBack();

        // Log the error
        Log::error('Error storing post:', ['error' => $e->getMessage()]);

        // Return a JSON response with an error message
        return response()->json(['error' => 'Terjadi kesalahan saat menyimpan data.'], 500);
    }
}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Post $post)
{
    try {
        // Start the database transaction
        DB::beginTransaction();
        Log::info('Request data:', $request->all());

        // Validate form
        $validator = validator($request->all(), [
            'image'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
            'title'   => 'required|min:5',
            'content' => 'required|min:10',
            'event'   => 'required'
        ]);

        if ($validator->fails()) {
            // Log validation errors
            Log::error('Validation errors:', ['errors' => $validator->errors()->all()]);

            return response()->json(['error' => 'Data yang diberikan tidak valid.'], 422);
        }

        // Check if image is uploaded
        if ($request->hasFile('image')) {
            // Upload new image
            $image = $request->file('image');
            $image->storeAs('public/post', $image->hashName());

            // Delete old image
            Storage::delete('public/post/' . $post->image);

            // Update post with new image
            $post->update([
                'image'   => $image->hashName(),
                'title'   => $request->title,
                'content' => $request->content,
                'event'   => $request->event
            ]);
        } else {
            // Update post without image
            $post->update([
                'title'   => $request->title,
                'content' => $request->content,
                'event'   => $request->event
            ]);
        }

        // Commit the database transaction
        DB::commit();

        return response()->json(['message' => 'Data Berhasil Diubah!'], 200);
    } catch (\Exception $e) {
        // An error occurred, rollback the transaction
        DB::rollBack();

        // Log the error
        Log::error('Error updating post:', ['error' => $e->getMessage()]);

        // Return a JSON response with an error message
        return response()->json(['error' => 'Terjadi kesalahan saat mengubah data.'], 500);
    }
}

   /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        try {
            // Start the database transaction
            DB::beginTransaction();

            // Delete image
            Storage::delete('public/post/' . $post->image);

            // Delete post
            $post->delete();

            // Commit the database transaction
            DB::commit();

            return response()->json(['message' => 'Data Berhasil Dihapus!'], 200);
        } catch (\Exception $e) {
            // An error occurred, rollback the transaction
            DB::rollBack();

            // Log the error
            Log::error('Error deleting post:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat menghapus data.'], 500);
        }
    }
}
