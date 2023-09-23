<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User; // Import the User model
use Illuminate\Validation\ValidationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class AvatarController extends Controller
{
    public function edit()
    {
        return view('profile.edit');
    }

    public function updateAvatar(Request $request)
{
    // Validate the avatar file
    $request->validate([
        'avatar' => 'nullable|image|max:10000', // Maksimal 10 MB
    ]);

    $user = auth()->user();

    // Check if an avatar file is uploaded
    if ($request->hasFile('avatar')) {
        // Upload the new avatar
        $avatar = $request->file('avatar');
        $avatarPath = $avatar->store('avatars', 'public');

        // Check if the user already has an avatar
        if ($user->avatar) {
            // Delete the old avatar
            Storage::disk('public')->delete($user->avatar);
        }

        // Update the user's avatar column with the new avatar path
        $user->avatar = $avatarPath;
    }

    // Save the updated user model
    try {
        $user->save();

        if ($request->hasFile('avatar')) {
            $message = 'Avatar Anda berhasil diperbarui.';
        } else {
            $message = 'Profil Anda berhasil diperbarui.';
        }

        return redirect()->route('profile.edit')->with('success', $message);
    } catch (\Exception $e) {
        // Handle database error
        return redirect()->back()->with('error', 'Terjadi kesalahan dalam mengubah avatar Anda.')->withInput();
    }
}

        public function getProfilePictureUrl()
        {
            $user = auth()->user();
            $avatarPath = 'avatars/' . $user->avatar;

            // Check if the image exists in the public/avatars directory
            if (File::exists(public_path($avatarPath))) {
                return asset($avatarPath);
            }

            // If the image doesn't exist, return a default image URL or a placeholder URL
            return asset('default_profile_picture.jpg'); // You can replace this with your default image URL or a placeholder URL
        }



    public function deleteAvatar()
    {
        $user = auth()->user();

        // Hapus file avatar jika ada
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->avatar = null;
            $user->save();
        }

        return redirect()->route('profile.edit')->with('success', 'Avatar Anda berhasil dihapus.');
    }
}
