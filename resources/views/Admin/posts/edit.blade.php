@extends('layouts.AdminApp')

@section('content')
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- ... (head section) ... -->
</head>

<body style="background: lightgray">
    <div class="container mt-5">
        <!-- Form untuk mengedit post -->
        <form action="{{ route('posts.update', $post->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <!-- Input untuk gambar -->
            <div class="form-group">
                <label class="font-weight-bold">GAMBAR</label>
                <input type="file" class="form-control @error('image') is-invalid @enderror" name="image">
                @error('image')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <!-- Input untuk judul -->
            <div class="form-group">
                <label class="font-weight-bold">JUDUL</label>
                <input type="text" class="form-control @error('title') is-invalid @enderror" name="title"
                    value="{{ $post->title }}" placeholder="Masukkan Judul Post">
                @error('title')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <!-- Input untuk event -->
            <div class="form-group">
                <label class="font-weight-bold">EVENT</label>
                <select class="form-control @error('event') is-invalid @enderror" name="event">
                    @foreach($events as $event)
                    <option value="{{ $event }}" @if($post->event == $event) selected @endif>{{ $event }}</option>
                    @endforeach
                </select>
                @error('event')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <!-- Input untuk konten -->
            <div class="form-group">
                <label class="font-weight-bold">KONTEN</label>
                <textarea class="form-control @error('content') is-invalid @enderror" name="content" rows="5"
                    placeholder="Masukkan Konten Post">{{ $post->content }}</textarea>
                @error('content')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <!-- Tombol Simpan dan Reset -->
            <button type="submit" class="btn btn-md btn-primary">SIMPAN</button>
            <button type="reset" class="btn btn-md btn-warning">RESET</button>
        </form>
    </div>

    <!-- ... (scripts) ... -->
</body>

</html>
@endsection
