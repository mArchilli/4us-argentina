<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Products Images
    |--------------------------------------------------------------------------
    |
    | PUBLIC_PRODUCTS_IMAGES_PATH  — subfolder inside the public disk where
    |   product media files are physically stored.
    |
    | PUBLIC_PRODUCTS_IMAGES_URL_PATH — URL-facing prefix used to reference
    |   those files (useful when a CDN or rewrite rule decouples the URL from
    |   the storage path).
    |
    */

    'products_images_path'     => env('PUBLIC_PRODUCTS_IMAGES_PATH', 'images/products'),
    'products_images_url_path' => env('PUBLIC_PRODUCTS_IMAGES_URL_PATH', 'images/products'),

];
