<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akseptor Form</title>
</head>
<body>

    <h1>Akseptor Form</h1>

    @if(session('message'))
        <p>{{ session('message') }}</p>
    @endif

    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    <form action="{{ route('index') }}" method="post" enctype="multipart/form-data">
        @csrf

        <label for="nama">Nama:</label>
        <input type="text" name="nama" required>
        <br>

        <label for="telepon">Telepon:</label>
        <input type="text" name="telepon" required>
        <br>

        <label for="tanggal_lahir">Tanggal Lahir (dd/mm/yyyy):</label>
        <input type="text" name="tanggal_lahir" placeholder="dd/mm/yyyy" required>
        <br>

        <label for="golongan_darah">Golongan Darah:</label>
        <input type="text" name="golongan_darah" required>
        <br>

        <label for="kelurahan_id">Kelurahan ID:</label>
        <input type="text" name="kelurahan_id">
        <br>

        <label for="tujuan_pengajuan">Tujuan Pengajuan:</label>
        <input type="text" name="tujuan_pengajuan" required>
        <br>

        <label for="image">Image:</label>
        <input type="file" name="image" accept="image/*" required>
        <br>

        <button type="submit">Submit</button>
    </form>

</body>
</html>
