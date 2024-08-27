<?php

namespace App\Framework\App; 

interface RequestHandler
{
    public function execute(String $request);
}
