<!DOCTYPE html>
<html>
<head>
    <title>Send Fonnte Message</title>
</head>
<body>
    <h1>Send Fonnte Message</h1>
    <form method="POST" action="{{ route('fonntee') }}">
        @csrf
        <div class="mb-3">
            <label for="golongan_darah" class="form-label">Golongan Darah:</label>
            <select name="golongan_darah" id="golongan_darah" class="form-select" required>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="message" class="form-label">Message:</label>
            <textarea name="message" id="message" class="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
</body>
</html>
