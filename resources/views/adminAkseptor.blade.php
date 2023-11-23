<!-- resources/views/admin/verify_akseptor.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Akseptor</title>
</head>
<body>
    <h1>Verify Akseptor</h1>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <!-- Add more columns as needed -->
            </tr>
        </thead>
        <tbody>
            @foreach($akseptor as $item)
            <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->nama }}</td>
                <td>{{ $item->telepon }}</td>
                <!-- Add more columns as needed -->
                <td>
                    <a href="{{ route('verify_akseptor.edit', ['id' => $item->id]) }}">Edit</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <form action="{{ route('verify_akseptor.update', ['id' => $item->id]) }}" method="post">
        @csrf
        @method('put')

        <label for="message">Verification Message:</label>
        <input type="text" name="message" required>

        <button type="submit">Send Verification</button>
    </form>
</body>
</html>
