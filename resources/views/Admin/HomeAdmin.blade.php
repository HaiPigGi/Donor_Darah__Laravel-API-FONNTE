@extends('layouts.AdminApp')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Admin Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <h1>Welcome, Admin!</h1>
                    <p>This is the admin dashboard.</p>

                    <!-- Navigasi Menu -->
                    <div class="mt-4">
                        <a href="{{ route('posts.index') }}" class="btn btn-primary">Lihat Semua Post</a>
                        <a href="{{ route('posts.create') }}" class="btn btn-success">Tambah Post Baru</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
