<div class="site-overlay"></div>
<div class="site-sidebar" style="background-color: #0d47a1;">
    <div class="custom-scroll custom-scroll-light">
        <ul class="sidebar-menu" id="first_sidebar">
            <li>
                <a href="#" class="" style="cursor: default;">
                    <span id="user-name-div" class="s-text text-center" ></span>
                </a>
            </li>
            <li>
                <div id="local_div" style="padding:1rem 0;">
                    <img
                        src="{{ asset('assets/admins/images/icon.png') }}"
                        width="100%"
                        style="padding:1rem 0;display:none;background-color: #0d47a1;"
                    ></div>
            </li>
        </ul>
        <div id="participants-chats-rch">
            <div id="sidebar-pcr-container">
                <div id="pcr__participants-list">
                    <ul id="pcr__topmenu" class="nav nav-tabs" role="tablist">
                        <li class="nav-item participants" title="Participants list">
                            <a
                                class="nav-link active"
                                id="pcr__participants-tab"
                                data-toggle="tab"
                                href="#pcr__participants"
                                role="tab"
                                aria-controls="pcr__participants"
                                aria-selected="true"
                            >
                                <i class="fa fa-users"></i>
                            </a>
                        </li>
                        <li class="nav-item chats" title="Group chat">
                            <a
                                class="nav-link"
                                id="pcr__chats-tab"
                                data-toggle="tab"
                                href="#pcr__chats"
                                role="tab"
                                aria-controls="pcr__chats"
                                aria-selected="true"
                            >
                                <i class="fas fa-comments"></i>
                                <span class="tag tag-danger top" id="chat-tag">0</span>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="pcr__participants" class="tab-pane show active" role="tabpanel" aria-labelledby="pcr__participants-tab">
                            <div ng-app="userJoinListApp">
                                <div id="attendance-layout" ng-controller="userJoinListController">
                                    <div ng-include="attendanceTemplate.url"></div>
                                </div>
                            </div>
                        </div>
                        <div id="pcr__chats" class="tab-pane fade public-chats-list " role="tabpanel" aria-labelledby="pcr__chats-tab">
                            <h3 class="group-chat-label text-center">Group Chat</h3>
                            <div class="chat-list-container">
                                <div id="chat" class="chat-messages"></div>
                            </div>
                            <div class="scw-form">
                                <form>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="chat-text-area"
                                            placeholder="Type here..."
                                            onkeyup="sendChat(event)"
                                            aria-describedby="basic-addon1">
                                        <span class="input-group-addon" id="basic-addon1">
                                            <label for="file_upload_public">
                                                <i class="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                                            </label>
                                            <input
                                                type="file"
                                                class="file-input hide"
                                                name="file_upload"
                                                id="file_upload_public">
                                       </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pm-list-container"></div>
            </div>
        </div>
        <ul class="sidebar-menu" id="third_sidebar">
            <li >
                <a class="nav-link b-r-0"   target="_blank" style="border-left: none !important;">
                    &copy; {{ now()->format('Y') }} Ngoma Digitech
                </a>
            </li>
        </ul>
    </div>
    <a class="sidebar-toggle" href="javascript:void(0);" id="sidebar-toggle" title="">
        <i class="fas fa-angle-double-right"></i>
    </a>
</div>
