<?php

use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Filesystem\FilesystemAdapter;


function saveImages($request, string $inputName, string $directory = 'images', $width = 150, $height = 150, $isArray = false)
{
    $paths = [];

    // Kiểm tra xem có file không
    if ($request->hasFile($inputName)) {
        // Lấy tất cả các file hình ảnh
        $images = $request->file($inputName);

        if (!is_array($images)) {
            $images = [$images]; // Đưa vào mảng nếu chỉ có 1 ảnh
        }

        // Tạo instance của ImageManager
        $manager = new ImageManager(new Driver());

        foreach ($images as $key => $image) {
            // Đọc hình ảnh từ đường dẫn thực
            $img = $manager->read($image->getPathName());

            // Thay đổi kích thước
            $img->resize($width, $height);

            // Tạo tên file duy nhất
            $filename = time() . uniqid() . '.' . $image->getClientOriginalExtension();

            // Lưu hình ảnh đã được thay đổi kích thước vào storage
            Storage::disk('public')->put($directory . '/' . $filename, $img->encode());

            // Lưu đường dẫn vào mảng
            $paths[$key] = $directory . '/' . $filename;
        }

        // Trả về danh sách các đường dẫn
        return $isArray ? $paths : $paths[0];
    }

    return null;
}


function saveImage($request, string $inputName, string $directory = 'images')
{
    if ($request->hasFile($inputName)) {
        $image = $request->file($inputName);
        $filename = time() . uniqid() . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($directory . '/' . $filename, file_get_contents($image->getPathName()));
        return $directory . '/' . $filename;
    }
}

function showImage($path, $default = 'image-default.jpg')
{
    /** @var FilesystemAdapter $storage */
    $storage = Storage::disk('public');

    if ($path && Storage::exists($path)) {
        return $storage->url($path);
    }

    return asset('backend/assets/img/' . $default);
}

function getSize($path)
{
    if ($path && Storage::disk('public')->exists($path)) {
        $sizeInBytes = Storage::disk('public')->size($path);

        // Convert bytes to MB or GB
        if ($sizeInBytes >= 1073741824) {
            // GB
            return number_format($sizeInBytes / 1073741824, 2) . ' GB';
        } elseif ($sizeInBytes >= 1048576) {
            // MB
            return number_format($sizeInBytes / 1048576, 2) . ' MB';
        } elseif ($sizeInBytes >= 1024) {
            // KB
            return number_format($sizeInBytes / 1024, 2) . ' KB';
        } else {
            // Bytes
            return $sizeInBytes . ' bytes';
        }
    }

    return '0 MB'; // Return 0MB if file doesn't exist
}


function deleteImage($path)
{
    if ($path && Storage::disk('public')->exists($path)) {
        Storage::disk('public')->delete($path);
    }
}

// Ví dụ trong Controller hoặc Model

function getYouTubeVideoId($url)
{
    // Kiểm tra nếu là URL của YouTube Shorts
    if (preg_match('/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
        return $matches[1];  // Trả về video ID
    }

    // Kiểm tra nếu là URL của video YouTube thông thường
    if (preg_match('/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/', $url, $matches)) {
        return $matches[1];  // Trả về video ID
    }

    return null;  // Nếu không tìm thấy ID
}

function formatString($json = null)
{
    if (empty($json))  return null;

    $keywordsArray = json_decode($json, true);

    $keywordsString = implode(', ', array_column($keywordsArray, 'value'));

    return $keywordsString;
}
