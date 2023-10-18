<?php

namespace App\Http\Controllers\admin;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a form for creating a new post.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $events = ['PMI']; // Add the available events here

        return view('admin.posts.create', compact('events'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $posts = Post::latest()->paginate(5);

        return view('admin.posts.index', compact('posts'));
    }

    public function indexUser()
    {
        $posts = Post::latest()->paginate(5);

        // Memperbarui konten setiap posting agar tidak lebih dari 100 kata
        foreach ($posts as $post) {
            $post->content = Str::limit(strip_tags($post->content), 10000);
        }

        return view('NAuth.home', compact('posts'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate form
        $this->validate($request, [
            'image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
            'title'     => 'required|min:5',
            'content'   => 'required|min:10',
            'event'     => 'required'
        ]);

        // Upload image
        $image = $request->file('image');
        $image->storeAs('public/img', $image);

        // Create post
        Post::create([
            'image'     => $image->hashName(),
            'title'     => $request->title,
            'content'   => $request->content,
            'event'     => $request->event
        ]);

        // Redirect to index
        return redirect()->route('posts.index')->with(['success' => 'Data Berhasil Disimpan!']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\View\View
     */
    public function edit(Post $post)
    {
        $events = ['PMI']; // Add the available events here

        return view('admin.posts.edit', compact('post', 'events'));
    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Post $post)
    {
        // Validate form
        $this->validate($request, [
            'image'     => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title'     => 'required|min:5',
            'content'   => 'required|min:10',
            'event'     => 'required'
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
                'image'     => $image->hashName(),
                'title'     => $request->title,
                'content'   => $request->content,
                'event'     => $request->event
            ]);
        } else {
            // Update post without image
            $post->update([
                'title'     => $request->title,
                'content'   => $request->content,
                'event'     => $request->event
            ]);
        }

        // Redirect to index
        return redirect()->route('posts.index')->with(['success' => 'Data Berhasil Diubah!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Post $post)
    {
        // Delete image
        Storage::delete('public/posts/' . $post->image);

        // Delete post
        $post->delete();

        // Redirect to index
        return redirect()->route('posts.index')->with(['success' => 'Data Berhasil Dihapus!']);
    }
}
