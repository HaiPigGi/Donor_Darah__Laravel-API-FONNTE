<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        Log::info('Request data:', $request->all());
        // Validate form
        $this->validate($request, [
            'image'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
            'title'   => 'required|min:5',
            'content' => 'required|min:10',
            'event'   => 'required'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/post', $image->hashName());

        Post::create([
            'image'   => $image->hashName(),
            'title'   => $request->title,
            'content' => $request->content,
            'event'   => $request->event
        ]);

        return response()->json(['message' => 'Data Berhasil Disimpan!'], 200);
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
        // Validate form
        $this->validate($request, [
            'image'   => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title'   => 'required|min:5',
            'content' => 'required|min:10',
            'event'   => 'required'
        ]);

        // Check if image is uploaded
        if ($request->hasFile('image')) {
            // Upload new image
            $image = $request->file('image');
            $image->storeAs('public/posts', $image->hashName());

            // Delete old image
            Storage::delete('public/posts/' . $post->image);

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

        return response()->json(['message' => 'Data Berhasil Diubah!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        // Delete image
        Storage::delete('public/posts/' . $post->image);

        // Delete post
        $post->delete();

        return response()->json(['message' => 'Data Berhasil Dihapus!'], 200);
    }
}
