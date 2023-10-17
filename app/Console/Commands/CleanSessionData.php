<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\sessionModels;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CleanSessionData extends Command
{
    protected $signature = 'sessions:clean';
    protected $description = 'Clean session data older than 10 minutes';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tenMinutesAgo = Carbon::now()->subMinutes(10);

        // Hapus data sesi yang lebih tua dari 10 menit
        sessionModels::where('created_at', '<', $tenMinutesAgo)->delete();

         // Logout pengguna saat sesi dihapus
        Auth::logout();

        $this->info('Session data older than 10 minutes has been cleaned.');
    }
}
