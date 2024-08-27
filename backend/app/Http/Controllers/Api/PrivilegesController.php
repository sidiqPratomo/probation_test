<?php

namespace App\Http\Controllers\Api;

use App\Models\Privileges;
use App\Http\Controllers\Controller;
use App\Services\ResponseService;

class PrivilegesController extends Controller
{
    protected $response;

    public function __construct(ResponseService $response)
    {
        $this->response = $response;
    }

    public function fetch()
    {
        $privileges = Privileges::all();
        $keyGetter = function ($item) {
            return $item['submodule'];
        };
        $grouped = $this->customGroupBy($privileges->toArray(), $keyGetter);

        $entries = [];

        foreach ($grouped as $index => $obj) {
            $entries[] = array(
                'name' => $index,
                'mapping' => $obj
            );
        }

        return $this->response->successResponse($entries);
    }

    private function customGroupBy($list, $keyGetter)
    {
        $map = array();

        foreach ($list as $item) {
            $key = $keyGetter($item);

            if (!array_key_exists($key, $map)) {
                $map[$key] = array($item);
            } else {
                $map[$key][] = $item;
            }
        }

        return $map;
    }
}
