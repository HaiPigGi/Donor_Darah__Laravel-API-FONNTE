<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class FonnteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
{
    $this->app->bind('fonnte', function () {
        return new \GuzzleHttp\Client([
            'base_uri' => config('services.fonnte.base_uri'),
        ]);
    });
}


    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
