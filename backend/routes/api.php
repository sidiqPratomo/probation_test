<?php

use App\Http\Controllers\Api\ApiResourcesController;
use App\Http\Controllers\Api\AuditrailController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\ExamplesController;
use App\Http\Controllers\Api\PrivilegesController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\Storage\FileController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\api\RegionController;
use App\Http\Controllers\Api\SubDistrictController;
use Illuminate\Support\Facades\Route;
use PHPUnit\Framework\Attributes\Group;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('', function () {
    return phpinfo();
});

Route::prefix('v1')->group(function () {
    Route::group([
        'prefix' => 'auth'
    ], function () {
        Route::post('signin', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
    });
});

Route::prefix('v1')->group(function () {
    Route::group([
        'prefix' => 'file'
    ], function () {
        Route::post('upload', [FileController::class, 'upload']);
        Route::get('download', [FileController::class, 'get']);
    });
});

Route::middleware(['auth:api'])->prefix('v1')->group(function () {
    Route::group([
        'prefix' => 'auth',
    ], function () {
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware(['auth:api'])->prefix('v1')->group(function () {
    Route::prefix('auditrails')->group(function() {
        Route::get('/', [AuditrailController::class, 'index']);
        Route::get('/log/download', [AuditrailController::class, 'download']);
    });

    Route::prefix('examples')->group(function() {
        Route::post('/', [ExamplesController::class, 'create']);
        Route::get('/{id}', [ExamplesController::class, 'read']);
        Route::put('/{id}', [ExamplesController:: class, 'update']);
    });

    Route::prefix('privileges')->group(function () {
        Route::get('fetch/format', [PrivilegesController::class, 'fetch']);
    });

    Route::prefix('roles')->group(function () {
        Route::post('/', [RolesController::class, 'create']);
        Route::get('{role}', [RolesController::class, 'read']);
        Route::put('{role}', [RolesController::class, 'update']);
    });

    Route::prefix('users')->group(function () {
        Route::post('/', [UsersController::class, 'create']);
        Route::get('{users}', [UsersController::class, 'read']);
        Route::put('{users}', [UsersController::class, 'update']);
    });

    Route::prefix('province')->group(function () {
        Route::post('/', [ProvinceController::class, 'createProvince']);
        Route::get('/', [ProvinceController::class, 'getAllProvince']);
        Route::get('{id}', [ProvinceController::class, 'getProvinceById']);
        Route::put('{id}', [ProvinceController::class, 'update']);
    });

    Route::prefix('city')->group(function () {
        Route::post('/', [CityController::class, 'createCity']);
        Route::get('/', [CityController::class, 'getAllCity']);
        Route::get('{id}', [CityController::class, 'getCityById']);
        Route::put('{id}', [CityController::class, 'update']);
    });

    Route::prefix('district')->group(function () {
        Route::post('/', [DistrictController::class, 'createDistrict']);
        Route::get('/', [DistrictController::class, 'getAllDistrict']);
        Route::get('{id}', [DistrictController::class, 'getDistrictById']);
        Route::put('{id}', [DistrictController::class, 'update']);
        Route::delete('{id}/destroy', [DistrictController::class, 'hardDelete']);
    });

    Route::prefix('subdistrict')->group(function () {
        Route::post('/', [SubDistrictController::class, 'createSubDistrict']);
        Route::get('/', [SubDistrictController::class, 'getAllSubDistrict']);
        Route::get('{id}', [SubDistrictController::class, 'getSubDistrictById']);
        Route::put('{id}', [SubDistrictController::class, 'update']);
        Route::delete('{id}/destroy', [SubDistrictController::class, 'hardDelete']);
    });

    Route::prefix('region')->group(function () {
        Route::post('/', [RegionController::class, 'createIsland']);
        Route::get('/', [RegionController::class, 'getAllIsland']);
        Route::get('{id}', [RegionController::class, 'getIslandById']);
        Route::put('{id}', [RegionController::class, 'update']);
    });
});

Route::middleware(['auth:api', 'checkModel'])->prefix('v1')->group(function () {
    Route::get('{collection}', [ApiResourcesController::class, 'index']);
    Route::get('{collection}/null/export', [ApiResourcesController::class, 'export']);
    Route::get('{collection}/{id}', [ApiResourcesController::class, 'read']);
    Route::post('{collection}', [ApiResourcesController::class, 'create']);
    Route::put('{collection}/{id}', [ApiResourcesController::class, 'update']);
    Route::put('{collection}/{id}/delete', [ApiResourcesController::class, 'softDelete']);
    Route::delete('{collection}/{id}/destroy', [ApiResourcesController::class, 'hardDelete']);
    Route::put('{collection}/{id}/restore', [ApiResourcesController::class, 'restore']);
});
