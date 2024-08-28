<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Districts;
use App\Services\ResponseService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DistrictController extends ApiResourcesController
{
    protected $response;
    protected $district;

    public function __construct(ResponseService $response, Districts $district)
    {
        $this->response = $response;
        $this->district = $district;
    }
    public function getAllDistrict(Request $request)
    {
        try {
            $entries = $this->district
                ->filter($request)
                ->with('city:name,id')
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

    public function getDistrictById($id)
    {
        try {
            $district = $this->district->find($id);

            if (!$district) {
                return $this->response->notFoundResponse('District not found');
            }

            return $this->response->successResponse($district->toArray(), 'District retrieved successfully');
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function createDistrict(Request $request)
    {
        try {
            $city = City::find($request->get('city_code'));
            if (!$city) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'City code not found',
                ], 422);
            }

            $checkDistrictCode = Districts::where('district_code', $request->get('district_code'))->first();
            if ($checkDistrictCode) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'District code already exists',
                ], 422);
            }

            $validator = $this->district->validator($request);
            if ($validator->fails()) {
                return $this->response->errorResponse($validator->errors()->toArray(), "Validations error", 422);
            }

            $fields = $request->only($this->district->getFields());
            foreach ($fields as $key => $value) {
                $this->district->setAttribute($key, $value);
            }

            $this->district->save();

            return response()->json(
                [
                    'status' => true,
                    'code' => 201,
                    'message' => 'Data created.',
                    'data' => $this->district,
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
            $entry = $this->district->statusActive()->find($request->id);

            if (!$entry) {
                return $this->response->notFoundResponse();
            }

            $checkDistrictCode = Districts::where('district_code', $request->get('district_code'))->first();
            if ($checkDistrictCode) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'District code already exists',
                ], 422);
            }

            $validators = $this->district->validator($request);
            if ($validators->fails()) {
                return $this->validatorErrors($validators);
            }
            $fields = $request->only($this->district->getFields());
            foreach ($fields as $key => $value) {
                $entry->setAttribute($key, $value);
            }
            $entry->save();
            return $this->response->successResponse($entry->toArray());
        } catch (Exception $error) {
            return $this->generalError($error);
        }
    }

    public function hardDelete(Request $request): JsonResponse
    {
        try {
            $id = $request->segment(4);
            $ids = explode(',', $id);

            if (count($ids) === 1) {
                $entry = $this->district->find($id);

                if (!$entry) {
                    return $this->response->notFoundResponse();
                }

                $entry->delete();

                return $this->response->successResponse($entry->toArray());
            }

            if (count($ids) > 1) {
                $entries = [];
                foreach ($ids as $id) {
                    $entry = $this->model->find($id);

                    if ($entry) {
                        $entry->delete();
                        array_push($entries, $entries);
                    }
                }

                return $this->response->successResponse(
                    [
                        'data' => $entries,
                    ],
                    'Data deleted.'
                );
            }

            return $this->response->notFoundResponse();
        } catch (Exception $error) {
            return $this->generalError($error);
        }
    }
}
