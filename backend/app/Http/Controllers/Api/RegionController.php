<?php

namespace App\Http\Controllers\api;

use App\Models\City;
use App\Models\Island;
use App\Models\Province;
use App\Services\ResponseService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegionController extends ApiResourcesController
{
    protected $response;
    protected $island;

    public function __construct(ResponseService $response, Island $island)
    {
        $this->response = $response;
        $this->island = $island;
    }
    public function store(Request $request)
    {
        $request->validate([
            'island' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]);

        // Find or create Island
        $island = Island::firstOrCreate(['name' => $request->input('island')]);

        // Find or create Province
        $province = Province::firstOrCreate([
            'name' => $request->input('province'),
            'island_id' => $island->id,
        ]);

        // Find or create City
        $city = City::firstOrCreate([
            'name' => $request->input('city'),
            'id_provinsi' => $province->id,
        ]);

        return response()->json([
            'message' => 'Region successfully registered',
            'data' => [
                'island' => $island->name,
                'province' => $province->name,
                'city' => $city->name,
            ]
        ]);
    }

    public function getAllIsland(Request $request)
    {
        try {
            $entries = $this->island
            ->filter($request)
            ->applySearch(request('!search'))
            ->orderFilter($request)
            ->statusActive();


        $entriesCounted = $entries->count();
        $entriesData = $entries->paginateFilter($request)->get();

        return $this->response->sendResponse("Data retrieved", $entriesData, $entriesCounted);
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function getIslandById(int $id): JsonResponse
    {
        try {
            $island = $this->island->find($id);

            if (!$island) {
                return $this->response->notFoundResponse('Island not found.');
            }

            return $this->response->successResponse(
                $island->toArray(),
                'Data retrieved successfully'
            );
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function createIsland(Request $request)
    {
        try {
            $validator = $this->island->validator($request);
            if ($validator->fails()) {
                return $this->response->errorResponse($validator->errors()->toArray(), "Validations error", 422);
            }

            $fields = $request->only($this->island->getFields());
            foreach ($fields as $key => $value) {
                $this->island->setAttribute($key, $value);
            }

            $this->island->save();

            return response()->json(
                [
                    'status' => true,
                    'code' => 201,
                    'message' => 'Data created.',
                    'data' => $this->island,
                ],
                201
            );
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            $entry = $this->island->statusActive()->find($request->id);

            if (!$entry) {
                return $this->response->notFoundResponse();
            }

            $validators = $this->island->validator($request);
            if ($validators->fails()) {
                return $this->validatorErrors($validators);
            }
            $fields = $request->only($this->island->getFields());
            foreach ($fields as $key => $value) {
                $entry->setAttribute($key, $value);
            }
            $entry->save();
            return $this->response->successResponse($entry->toArray());
        } catch (Exception $error) {
            return $this->generalError($error);
        }
    }
}
