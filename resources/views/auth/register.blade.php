@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Register') }}</div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('register.verify') }}">
                            @csrf

                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name"
                                        value="{{ old('name') }}" required autocomplete="name" autofocus>
                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <!-- Phone Number Input -->
                            <div class="row mb-3">
                                <label for="telepon"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Telepon') }}</label>
                                <div class="col-md-6">
                                    <input id="telepon" type="text"
                                        class="form-control @error('telepon') is-invalid @enderror" name="telepon"
                                        value="{{ old('telepon') }}" required>

                                    @error('telepon')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <!-- Blood Type Input -->
                            <div class="row mb-3">
                                <label for="golongan_darah"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Golongan Darah') }}</label>
                                <div class="col-md-6">
                                    <input id="golongan_darah" type="text"
                                        class="form-control @error('golongan_darah') is-invalid @enderror"
                                        name="golongan_darah" value="{{ old('golongan_darah') }}" required>

                                    @error('golongan_darah')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" name="register.verify">Verify</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @if (session('success'))
        <script>
            console.log("{{ session('success') }}"); // Log success message to the browser console
        </script>
    @endif

    @if (session('error'))
        <script>
            console.error("{{ session('error') }}"); // Log error message to the browser console
        </script>
    @endif
@endsection
