@extends('layouts.AdminApp')

@section('content')
<div class="container mt-5">
    <div class="row">
        <div class="col-md-12">
            <div class="card border-0 shadow rounded">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Daftar Post Berita</h5>
                </div>
                <div class="card-body">
                    <!-- Daftar Post -->
                    <a href="{{ route('posts.create') }}" class="btn btn-success mb-3">Tambah Post</a>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>GAMBAR</th>
                                    <th>JUDUL</th>
                                    <th>CONTENT</th>
                                    <th>EVENT</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($posts as $post)
                                    <tr>
                                        <td class="text-center">
                                            <img src="{{ asset('storage/posts/'.$post->image) }}" class="rounded" style="width: 150px">
                                        </td>
                                        <td>{{ $post->title }}</td>
                                        <td>{!! $post->content !!}</td>
                                        <td>{{ $post->event }}</td>
                                        <td class="text-center">
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');" action="{{ route('posts.destroy', $post->id) }}" method="POST">
                                                <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-primary btn-sm">EDIT</a>
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm">HAPUS</button>
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="text-center">Data Post belum Tersedia.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                    {{ $posts->links() }}
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script>
    // Message with Toastr
    @if(session()->has('success'))
    toastr.success('{{ session('success') }}', 'BERHASIL!');
    @elseif(session()->has('error'))
    toastr.error('{{ session('error') }}', 'GAGAL!');
    @endif
</script>
@endsection
