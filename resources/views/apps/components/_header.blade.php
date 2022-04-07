<div class="site-header">
    <nav class="navbar navbar-dark">
        <div class="navbar-left" style="background-color:rgba(13,71,161,0.5);">
            <a class="navbar-brand" href="{{ asset('assets/aperi/Aperi Logo/SVG/Aperi.svg') }}" width="50" height="50"
               target="_blank">
                <div class="logo">
                    <img src="{{ asset('assets/aperi/Aperi Logo/SVG/Aperi.svg') }}" width="50" height="50"
                         style="margin-top: -2rem; height: 8rem; margin-left: -2rem;" alt="">
                </div>
            </a>
            <div class="toggle-button dark sidebar-toggle-first float-xs-left hidden-md-up">
                <span class="hamburger"></span>
            </div>
            <div class="toggle-button dark float-xs-right hidden-md-up" data-toggle="collapse"
                 data-target="#collapse-1">
                <span class="more"></span>
            </div>
        </div>
        <div class="navbar-right navbar-toggleable-sm collapse" id="collapse-1">
            <div class="toggle-button light sidebar-toggle-second float-xs-left hidden-sm-down" style="color:white;">
                <span class="hamburger"></span>
            </div>
            <ul class="nav navbar-nav float-md-right">
                <li class="nav-item pad-top-18" id="rec-notification" style=" display: none;">
                    <i class="fa fa-circle blink-image" style="color:red;">
                        <span
                            style="font-family:Titillium Web,serif;font-size: 16px;padding-left: 5px;text-transform: uppercase;line-height: 25px;"
                        >Rec</span>
                    </i>
                </li>
                <li class="nav-item pad-top-18" style="font-weight: bold;color:white;">
                    <label><i class="far fa-clock"></i></label>
                    <label id="duration-label" style="font-weight: bold;color:white;">00:00:00</label>
                </li>
                @if($role == 'participant')
                    <li class="nav-item dropdown">
                        <span class="vcx_bar" id="exit_meeting" title="Sign Out" onclick="hangUp()"
                              style="color:white;">
                            <i class="fa fa-power-off mr-0-5"></i>
                            Sign Out
                        </span>
                    </li>
                @else
                    <li class="nav-item dropdown">
                        <span style="color:white;" data-toggle="modal" data-target="#exampleModal">
                            <i class="fa fa-power-off mr-0-5"></i>
                            End Meeeting
                        </span>
                    </li>
                @endif
            </ul>
            <ul class="nav navbar-nav">
                <li class="nav-item hidden-sm-down">
                    <a class="nav-link toggle-fullscreen" href="#">
                        <i class="ti-fullscreen"></i>
                    </a>
                </li>
                <li class="nav-item pad-top-18" style="color:white;display: none;">
                    <h4 class="meeting-title"></h4>
                </li>
                <li class="nav-item pad-top-18" style="color:white;">
                    <h5>
                        {{ $room ?? "" }}
                    </h5>
                </li>
            </ul>
        </div>
    </nav>
</div>
