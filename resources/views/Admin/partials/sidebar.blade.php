<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-3">
  <div class="position-sticky pt-3">
      <ul class="nav flex-column">
          <li class="nav-item">
              <a class="nav-link {{ Request::is('dashboard') ? 'active' : '' }}" aria-current="page" href="/Admin">
                  <span data-feather="home" class="align-text-bottom"></span>
                  Berita
              </a>
          </li>
          <!-- Tambahkan item-item sidebar lainnya sesuai kebutuhan -->
      </ul>
  </div>
</nav>
