<!DOCTYPE html>
<html>
<head>
    <title>Send Fonnte Message</title>
</head>
<body>
    <h1>Send Fonnte Message</h1>
    <form method="POST" action="{{ route('fonntee') }}">
        @csrf
        <label for="target">Target:</label>
        <input type="text" name="target" id="target" required>
        <br>
        <label for="message">Message:</label>
        <textarea name="message" id="message" rows="4" required></textarea>
        <br>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>
