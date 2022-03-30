<?php

/**
 * Application: Sample App - 1 to 1 Video Call using EnableX Web Toolkit 1.3
 * Version: 1.0.0
 * This Sample Application demonstrates the use of Server APIs and Web Toolkit of EnableX platform to build
 * an one to one Video Conference
 * Configuration File - needs to be updated to meet your Application requirment
 * NOTE! Your Application Server must be hosted on HTTPS.
 * @author Scott-Tresor <scotttresor@gmail.com>
 */


return [
    'url' => env('ENABLE_URL', default: 'https://api.enablex.io/video/v2/'),
    'app_id' => env('ENABLE_ID', ''),
    'app_key' => env('ENABLE_KEY', '')
];
