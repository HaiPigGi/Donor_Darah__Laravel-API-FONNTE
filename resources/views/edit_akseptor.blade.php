<!-- resources/views/edit_akseptor.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Akseptor</title>
</head>
<body>
    <h1>Edit Akseptor</h1>

    <form action="{{ route('verify_akseptor.update', ['id' => $selectedAkseptor->id]) }}" method="post">
        @csrf
        @method('put')

        <label for="message">Verification Message:</label>
        <input type="text" name="message" value="{{ $selectedAkseptor->message }}" required>

        <label for="status">Status:</label>
        <select name="status" required>
            <option value="verify" {{ $selectedAkseptor->status === 'verify' ? 'selected' : '' }}>Verify</option>
            <option value="other_status" {{ $selectedAkseptor->status === 'other_status' ? 'selected' : '' }}>Other Status</option>
            <!-- Add more options as needed -->
        </select>

        <button type="submit">Update Akseptor</button>
    </form>

    <h2>Selected Akseptor</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <!-- Add more columns as needed -->
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $selectedAkseptor->id }}</td>
                <td>{{ $selectedAkseptor->nama }}</td>
                <td>{{ $selectedAkseptor->telepon }}</td>
                <td>{{ $selectedAkseptor->status }}</td>
                <!-- Add more columns as needed -->
            </tr>
        </tbody>
    </table>
</body>
</html>
