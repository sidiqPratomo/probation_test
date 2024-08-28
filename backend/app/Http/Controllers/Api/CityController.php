<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Province;
use App\Services\ResponseService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CityController extends ApiResourcesController
{
    protected $response;
    protected $city;

    public function __construct(ResponseService $response, City $city)
    {
        $this->response = $response;
        $this->city = $city;
    }

    public function getAllCity(Request $request)
    {
        try {
            // Mengambil nilai pencarian dari query string ?!search=...
            $search = $request->input('!search');
            $perPage = $request->input('!limit', 35);
            // Membuat query builder untuk model City
            $entries = $this->city
                ->with('province:name,id')  // Mengambil relasi dengan Province
                ->statusActive();  // Filter status aktif

            if ($search) {
                $entries->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('id', 'like', "%{$search}%");
                });
            }

            $request->merge(['!limit' => $perPage]);

            // Menerapkan filter dan sorting yang diterima dari request
            $entries->filter($request)
                ->orderFilter($request);

            // Mendapatkan jumlah total entri dan data yang sudah dipaginate
            $entriesCounted = $entries->count();
            $entriesData = $entries->paginateFilter($request)->get();

            return $this->response->sendResponse("Data retrieved", $entriesData, $entriesCounted);
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function getCityById($id)
    {
        try {
            $city = $this->city->find($id);

            if (!$city) {
                return $this->response->notFoundResponse('City not found');
            }

            return $this->response->successResponse($city->toArray(), 'City retrieved successfully');
        } catch (Exception $e) {
            return $this->response->internalServerErrorResponse($e->getMessage());
        }
    }

    public function createCity(Request $request)
    {
        try {
            $province = Province::find($request->get('id_provinsi'));
            if (!$province) {
                return response()->json([
                    'status' => false,
                    'code' => 422,
                    'message' => 'Province not found',
                ], 422);
            }

            $validator = $this->city->validator($request);
            if ($validator->fails()) {
                return $this->response->errorResponse($validator->errors()->toArray(), "Validations error", 422);
            }

            $fields = $request->only($this->city->getFields());
            foreach ($fields as $key => $value) {
                $this->city->setAttribute($key, $value);
            }

            $this->city->save();

            return response()->json(
                [
                    'status' => true,
                    'code' => 201,
                    'message' => 'Data created.',
                    'data' => $this->city,
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
            $entry = $this->city->statusActive()->find($request->id);

            if (!$entry) {
                return $this->response->notFoundResponse();
            }

            $validators = $this->city->validator($request);
            if ($validators->fails()) {
                return $this->validatorErrors($validators);
            }
            $fields = $request->only($this->city->getFields());
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
