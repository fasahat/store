<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1/')->group(function () {
    Route::post('/register', 'Auth\AuthController@register')->name('api.register');
    Route::post('/login', 'Auth\AuthController@login')->name('login');
    Route::post('/logout', 'Auth\AuthController@logout')->name('logout');

    Route::get('category','Category\CategoryController@index');
    Route::get('category/{category}','Category\CategoryController@show');

    Route::get('product', 'Product\ProductController@index');
    Route::get('product/{product}','Product\ProductController@show');

    Route::get('color','Color\ColorController@index');

    Route::post('search', 'Search\SearchController@search');
});


Route::prefix('v1/')->middleware('auth:api')->group(function () {

    Route::post('category/create','Category\CategoryController@create');
    Route::get('myCategories','Category\CategoryController@myCategories');


    Route::post('product/create','Product\ProductController@create');
    Route::get('myProducts','Product\ProductController@myProducts');

    Route::post('color/create','Color\ColorController@create');

});
