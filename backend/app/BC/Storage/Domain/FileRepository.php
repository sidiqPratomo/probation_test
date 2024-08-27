<?php

namespace App\BC\Storage\Domain;

use Illuminate\Http\UploadedFile;

interface FileRepository
{
    public function write(String $bucket, String $path, UploadedFile $file): File;
    public function read(String $bucket, String $path, String $filename): File;
}
