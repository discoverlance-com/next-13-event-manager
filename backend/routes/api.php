<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ListEventStatsController;
use App\Http\Controllers\ListUserEventsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group([
    'as' => 'api.',
    'middleware' => ['auth:sanctum']
], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('api.user');

    Route::get('/events/stats', ListEventStatsController::class)->name('events.stats');
    Route::get('/events/my-events', ListUserEventsController::class)->name('my-events');
    Route::apiResource('events', EventController::class);
});
