window.addEventListener('load', function () {
    if (sessionStorage.getItem('popupDismissed')) return;

    setTimeout(function () {
      var modal = new bootstrap.Modal(document.getElementById('consultationModal'), {
        backdrop: 'static',
        keyboard: false
      });
      modal.show();

      // Set flag when user dismisses (cross button or outside click)
      document.getElementById('consultationModal').addEventListener('hidden.bs.modal', function () {
        sessionStorage.setItem('popupDismissed', 'true');
      });
    }, 3000);
  });