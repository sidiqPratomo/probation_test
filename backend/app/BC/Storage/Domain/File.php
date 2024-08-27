<?php

namespace App\BC\Storage\Domain;

use App\Framework\Domain\DefaultDomain;

class File extends DefaultDomain
{
    protected String $bucket;
    protected String $path;
    protected String $mime;
    protected String $filename;
    protected String $originalFilename;

    public function setBucket(String $bucket)
    {
        $this->bucket = $bucket;
    }

    public function setPath(String $path)
    {
        $this->path = $path;
    }

    public function setMime(String $mime)
    {
        $this->mime = $mime;
    }

    public function setFilename(String $filename)
    {
        $this->filename = $filename;
    }

    public function getFilename()
    {
        return $this->filename;
    }

    public function setOriginalFilename(String $originalFilename)
    {
        $this->originalFilename = $originalFilename;
    }

    public function getFullPath(): string
    {
        return $this->bucket . '/' . $this->path . '/' . $this->filename;
    }

    public function getPath(): string
    {
        return $this->bucket . '/' . $this->path;
    }


    public function toArray(): array
    {
        return [
            'bucket' => $this->bucket,
            'path' => $this->path,
            'mime' => $this->mime,
            'filename' => $this->filename,
            'originalFilename' => $this->originalFilename
        ];
    }
}
