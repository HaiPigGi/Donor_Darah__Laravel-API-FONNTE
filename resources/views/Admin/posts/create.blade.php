@extends('layouts.AdminApp')

@section('content')
    <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Buat Posting Baru</div>

                    <div class="card-body">
                        <form action="{{ route('posts.store') }}" method="POST" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label for="image" class="font-weight-bold">GAMBAR</label>
                                <input type="file" class="form-control-file @error('image') is-invalid @enderror"
                                    name="image" id="image">

                                @error('image')
                                    <div class="invalid-feedback">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label for="title" class="font-weight-bold">JUDUL</label>
                                <input type="text" class="form-control @error('title') is-invalid @enderror"
                                    name="title" id="title" value="{{ old('title') }}" placeholder="Masukkan Judul Post">

                                @error('title')
                                    <div class="invalid-feedback">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label class="font-weight-bold">EVENT</label>
                                <div id="eventContainer">
                                    @foreach ($events as $index => $event)
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="event"
                                                id="event{{ $index }}" value="{{ $event }}">
                                            <label class="form-check-label" for="event{{ $index }}">
                                                {{ $event }}
                                            </label>
                                        </div>
                                    @endforeach
                                    <button type="button" class="btn btn-sm btn-primary mt-2" id="addEvent">Tambah Event</button>
                                </div>

                                @error('event')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label for="content" class="font-weight-bold">KONTEN</label>
                                <textarea class="form-control @error('content') is-invalid @enderror"
                                    name="content" rows="5" placeholder="Masukkan Konten Post" id="content">{{ old('content') }}</textarea>

                                @error('content')
                                    <div class="invalid-feedback">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <button type="submit" class="btn btn-md btn-primary">SIMPAN</button>
                            <button type="reset" class="btn btn-md btn-warning">RESET</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for entering custom event name -->
    <div class="modal fade" id="customEventModal" tabindex="-1" role="dialog" aria-labelledby="customEventModalLabel"
        aria-hidden="true">
        <!-- Modal content here -->
    </div>
@endsection
