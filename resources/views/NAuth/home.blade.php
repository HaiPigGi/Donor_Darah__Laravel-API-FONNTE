@extends('layouts.app')

@section('content')
    <!DOCTYPE html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'HMIF') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/style.css') }}" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">

    </head>

    <body>
            <!-- Jumbotron -->

            <!-- Agenda -->
            <div class="card-deck d-flex justify-content-center">
                @isset($posts)
                    @foreach ($posts as $post)
                        <div class="card col-md-4 mb-4 shadow-sm" style="margin: 10px;">
                            <img class="card-img-top mx-auto d-block" src="{{ asset('storage/posts/' . $post->image) }}"
                                alt="Card image cap">
                            <div class="card-body text-center mt-3">
                                <h5 class="card-title"><a href="#" class="text-primary">{{ $post->title }}</a></h5>
                                <p class="card-text">
                                    {{ Str::limit(strip_tags($post->content), 1000) }}
                                </p>
                            </div>
                        </div>
                    @endforeach
                @endisset
            </div>


            <!-- Akhir Agenda -->



            <!-- Akhir Agenda -->



            <!-- Akhir Footer -->


            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
            </script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous">
            </script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
            </script>
    </body>


    </html>
@endsection
