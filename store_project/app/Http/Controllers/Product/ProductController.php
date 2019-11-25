<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Exception;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $products = Product::get();

            return jsend_success($products);

        } catch (Exception $e) {
            return jsend_error($e->getMessage());
        }
    }
    public function create(Request $request)
    {

        $userID = decodeToken($request->header('Authorization'));

        $validator = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required',
            'RAM' => 'required',
            'color' => 'required'
        ]);

        if (!$validator->fails()) {
            try {
                $product = Product::create([
                    'name' => $request->get('name'),
                    'RAM' => $request->get('RAM'),
                    'category_id' => $request->get('category_id'),
                    'user_id' => $userID
                ]);

                $attachID = [$request->get('color')];
                $product->colors()->attach($attachID);
                $data = ['name' => $request->get('name')];
                return jsend_success($data);

            } catch (Exception $e) {
                return jsend_error($e->getMessage());
            }

        } else {
            return jsend_error('Invalid Input Data');
        }
    }

    public function show()
    {
        return 'hi';
    }

    public function myProducts(Request $request)
    {

        $user = decodeToken($request->header('Authorization'));

        $products = Product::where('user_id',$user->id)->get();
        if ($products) {
            return jsend_success($products);
        }
        return jsend_error('No Data');
    }
}
