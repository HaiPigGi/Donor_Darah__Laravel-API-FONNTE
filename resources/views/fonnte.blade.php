<!DOCTYPE html>
<html>

<head>
    <title>Send Fonnte Message</title>
    <!-- Add Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container">

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

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="successModalLabel">Success</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Message sent successfully!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Failure Modal -->
    <div class="modal fade" id="failureModal" tabindex="-1" aria-labelledby="failureModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="failureModalLabel">Error</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Error sending message. Please try again.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

    <!-- Add Bootstrap JavaScript and Popper.js (required for Bootstrap) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Your JavaScript code here -->
    <script src="{{ asset('js/fonnte.js') }}"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            const failureModal = new bootstrap.Modal(document.getElementById('failureModal'));

            const form = document.querySelector('form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                fetch('{{ route('fonntee') }}', {
                        method: 'POST',
                        body: new FormData(form),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            successModal.show(); // Show success modal
                        } else {
                            failureModal.show(); // Show failure modal
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        failureModal.show(); // Show failure modal on network error
                    });
            });
        });
    </script>
</body>

</html>
