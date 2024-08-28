<?php

namespace App\Http\Controllers\Api;

use App\Models\Island;
use App\Models\Province;
use App\Services\ResponseService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProvinceController extends ApiResourcesController
{
    protected $response;
    protected $province;

    public function __construct(ResponseService $response, Province $province)
    {
        $this->response = $response;
        $this->province = $province;
    }
    public function getAllProvince(Request $request)
    {
        try {
            $entries = $this->province
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

    public function getProvinceById(int $id): JsonResponse
    {
        try {
            $province = $this->province->find($id);

            if (!$province) {
                return $this->response->notFoundResponse('Province not found.');
            }

            return $this->response->successResponse(
                $province->toArray(),
                'Data retrieved successfully'
            );
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function createProvince(Request $request)
    {
        try {
            $province = Island::find($request->get('island_id'));
            if (!$province) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'Island not found',
                ], 422);
            }

            $validator = $this->province->validator($request);
            if ($validator->fails()) {
                return $this->response->errorResponse($validator->errors()->toArray(), "Validations error", 422);
            }

            $fields = $request->only($this->province->getFields());
            foreach ($fields as $key => $value) {
                $this->province->setAttribute($key, $value);
            }

            $this->province->save();

            return response()->json(
                [
                    'status' => true,
                    'code' => 201,
                    'message' => 'Data created.',
                    'data' => $this->province,
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
            $entry = $this->province->statusActive()->find($request->id);

            if (!$entry) {
                return $this->response->notFoundResponse();
            }

            $validators = $this->province->validator($request);
            if ($validators->fails()) {
                return $this->validatorErrors($validators);
            }
            $fields = $request->only($this->province->getFields());
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
