<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Districts;
use App\Models\Subdistricts;
use App\Services\ResponseService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubDistrictController extends ApiResourcesController
{
    protected $response;
    protected $subDistrict;

    public function __construct(ResponseService $response, Subdistricts $subDistrict)
    {
        $this->response = $response;
        $this->subDistrict = $subDistrict;
    }
    public function getAllSubDistrict(Request $request)
    {
        try {
            // Use the SubDistrict model to apply filters and ordering
            $entries = $this->subDistrict
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

    public function getSubDistrictById($id)
    {
        try {
            $subDistrict = $this->subDistrict->find($id);

            if (!$subDistrict) {
                return $this->response->notFoundResponse('Sub-district not found');
            }

            return $this->response->successResponse($subDistrict->toArray(), 'Sub-district retrieved successfully');
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function createSubDistrict(Request $request)
    {
        try {
            $district = Districts::where('district_code','like',$request->get('district_code'))->first();
            if (!$district) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'District code not found',
                ], 422);
            }

            $checkDistrictCode = SubDistricts::where('subdistrict_code', $request->get('subdistrict_code'))->first();
            if ($checkDistrictCode) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'subdistrict_code code already exists',
                ], 422);
            }

            $validator = $this->subDistrict->validator($request);
            if ($validator->fails()) {
                return $this->response->errorResponse($validator->errors()->toArray(), "Validations error", 422);
            }

            $fields = $request->only($this->subDistrict->getFields());
            foreach ($fields as $key => $value) {
                $this->subDistrict->setAttribute($key, $value);
            }

            $this->subDistrict->save();

            return response()->json(
                [
                    'status' => true,
                    'code' => 201,
                    'message' => 'Data created.',
                    'data' => $this->subDistrict,
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
            $entry = $this->subDistrict->statusActive()->find($request->id);

            if (!$entry) {
                return $this->response->notFoundResponse();
            }

            $validators = $this->subDistrict->validator($request);
            if ($validators->fails()) {
                return $this->validatorErrors($validators);
            }
            $fields = $request->only($this->subDistrict->getFields());
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
                $entry = $this->subDistrict->find($id);

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
