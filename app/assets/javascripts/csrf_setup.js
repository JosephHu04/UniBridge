// Inject CSRF token into all jQuery AJAX requests immediately
(function() {
    var token = document.querySelector('meta[name="csrf-token"]');
    if (token) {
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', token.getAttribute('content'));
            }
        });
    }
})();
