<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Exception;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $category = Category::get();

            return jsend_success($category);

        } catch (Exception $e) {
            return jsend_error($e->getMessage());
        }
    }

    public function create(Request $request)
    {
        $userID = decodeToken($request->header('Authorization'));

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'code' => 'required',
        ]);

        if (!$validator->fails()) {
            try {
                Category::create([
                    'name' => $request->get('name'),
                    'code' => $request->get('code'),
                    'parent_id' => $request->get('parent_id'),
                    'user_id' => $userID
                ]);

                $data = ['name' => $request->get('name')];
                return jsend_success($data);

            } catch (Exception $e) {
                return jsend_error($e->getMessage());
            }

        } else {
            return jsend_error('Invalid Input Data');
        }
    }

    public function show(Request $request,$category)
    {

        try {

            $category = Category::find($category);
            return jsend_success($category);

        } catch (Exception $e) {
            return jsend_error($e->getMessage());
        }
    }

    public function myCategories(Request $request)
    {

        $userID = decodeToken($request->header('Authorization'));

        $categories = Category::where('user_id',$userID)->get();
        if ($categories) {
            return jsend_success($categories);
        }
        return jsend_error('No Data');

    }
}
